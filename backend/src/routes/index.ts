import { Router } from "express";
import { authRouter } from "./auth.router";
import { dataRouter } from "./data.router";
import { foodRouter } from "./food.router";
import { userRouter } from "./user.router";


export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/data", dataRouter);
appRouter.use("/food", foodRouter);
appRouter.use("/user", userRouter);