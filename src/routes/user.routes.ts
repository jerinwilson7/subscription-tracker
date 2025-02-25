import { Request, Response, Router } from "express";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send({ message: "fetch all users" });
});
userRouter.get("/:id", (req: Request, res: Response) => {
  res.send({ message: "Get user details" });
});
userRouter.post("/", (req: Request, res: Response) => {
  res.send({ message: "Create new user" });
});
userRouter.put("/:id", (req: Request, res: Response) => {
  res.send({ message: "update user details" });
});
userRouter.delete("/:id", (req: Request, res: Response) => {
  res.send({ message: "delete user details" });
});

export default userRouter;
