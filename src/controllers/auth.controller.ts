import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import User from "../models/user.model";
import { config } from "../config/env";
import CustomError from "../middlewares";

interface SignUpRequest {
    username:string;
    password:string;
    email:string
  }

interface SignInRequest {
    password:string;
    email:string
  }

  

export const signUp = async (req:Request<{}, {}, SignUpRequest>, res:Response, next:NextFunction)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {JWT_EXPIRY,JWT_SECRET} = config.env

    try {
        const {email,password,username} = req.body

        const existingUser = await User.findOne({email})

        if(existingUser){
            throw new CustomError("user already exists",404)
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUsers = await User.create([{username,email,password:hashedPassword}],{session})


        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: "1d" });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message:"User created successfully",
            data:{
                user:newUsers[0],
                token
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req:Request<{},{},SignInRequest>, res:Response, next:NextFunction)=>{
  const {JWT_SECRET} = config.env
  try {
    
      const {email,password} = req.body
      
      const user = await User.findOne({email})
      
      if(!user){
          throw new CustomError("user not found",404)
        }
        
        const isValidPassword = await bcrypt.compare(password,user.password)
        
        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'1d'})
        
        if(!isValidPassword){
            
            throw new CustomError("invalid credentials",400)
        }
        
        res.status(200).json({
            message:"user sign in successfully",
            data:{
                token,
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

export const signOut = async (req:Request,res:Response, next:NextFunction)=>{}