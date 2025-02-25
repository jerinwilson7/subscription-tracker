import mongoose from "mongoose";
import { config } from "../config/env";
import picocolors from "picocolors";
const {MONGO_URI,NODE_ENV} = config.env

if(!MONGO_URI){
    throw new Error("Please define MONGO_URI in .env file")
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!) 
        console.log(picocolors.yellow(`Database connected successfully in ${NODE_ENV} mode`)) 
    } catch (error) {
        console.log("Error connecting db :",error)
    }
}

export default connectToDatabase