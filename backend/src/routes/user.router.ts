import { userController } from "@/controllers";
import { checkAuth } from "@/utils";
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", checkAuth, userController.getUserController);

userRouter.put("/", checkAuth, userController.updateInfoController);