import dotenv from "dotenv";
dotenv.config({path: `.env.${process.env.NODE_ENV || "development"}.local`});

import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from "express";
import morgan from 'morgan';
import picocolors from "picocolors";
import { config } from "./config/env";
import connectToDatabase from "./database/mongodb";
import errorMiddleware from "./middlewares/error.middleware";
import authRouter from "./routes/auth.routes";
import subscriptionRouter from "./routes/subscription.routes";
import userRouter from "./routes/user.routes";

const app: Application = express();
const {PORT} = config.env

app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


app.listen(PORT, async() => {
  await connectToDatabase()
  console.log(picocolors.green(`connected successfully to port ${PORT}`));
});

