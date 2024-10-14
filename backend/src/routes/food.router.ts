import { foodController } from "@/controllers";
import { checkAuth } from "@/utils";
import { Router } from "express";

export const foodRouter = Router();

foodRouter.get("/", checkAuth, foodController.getFoodController);
foodRouter.post("/", checkAuth, foodController.addFoodController);