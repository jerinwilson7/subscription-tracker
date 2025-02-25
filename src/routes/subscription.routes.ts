import { Request, Response, Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req:Request, res:Response) => {
    res.send({title:"fetch all subscriptions"})
})

subscriptionRouter.get("/:id", (req:Request, res:Response) => {
    res.send({title:"fetch subscription details"})
})
subscriptionRouter.post("/", (req:Request, res:Response) => {
    res.send({title:"create subscription"})
})
subscriptionRouter.put("/:id", (req:Request, res:Response) => {
    res.send({title:"update subscription details"})
})
subscriptionRouter.delete("/:id", (req:Request, res:Response) => {
    res.send({title:"delete subscription details"})
})
subscriptionRouter.get("/users/:id", (req:Request, res:Response) => {
    res.send({title:"fetch user subscriptions"})
})
subscriptionRouter.put("/users/:id/cancel", (req:Request, res:Response) => {
    res.send({title:"cancel user subscriptions"})
})
subscriptionRouter.get("/upcoming-renewals", (req:Request, res:Response) => {
    res.send({title:"fetch all upcoming renewals"})
})


export default subscriptionRouter;