import dotenv from "dotenv";
dotenv.config({path: `.env.${process.env.NODE_ENV || "development"}.local`});

import express, { Application, Request, Response } from "express";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import subscriptionRouter from "./routes/subscription.routes";
import connectToDatabase from "./database/mongodb";
import { config } from "./config/env";
import morgan from 'morgan'
import picocolors from "picocolors";

const app: Application = express();
const {PORT} = config.env

app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


app.listen(PORT, async() => {
  await connectToDatabase()
  console.log(picocolors.green(`connected successfully to port ${PORT}`));
});

