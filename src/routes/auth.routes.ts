import { Request, Response, Router } from "express";

const authRouter = Router();

authRouter.get("/sign-up", (req: Request, res: Response) => {
  res.send("sign up");
});
authRouter.get("/sign-in", (req: Request, res: Response) => {
  res.send("sign in");
});
authRouter.get("/sign-out", (req: Request, res: Response) => {
  res.send("sign out");
});

export default authRouter;