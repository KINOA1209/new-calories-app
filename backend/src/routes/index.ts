import { Router } from "express";
import { authRouter } from "./auth.router";
import { dataRouter } from "./data.router";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/data", dataRouter);
