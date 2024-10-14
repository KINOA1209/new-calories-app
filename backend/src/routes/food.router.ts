import { foodController } from "@/controllers";
import { checkAuth } from "@/utils";
import { Router } from "express";

export const foodRouter = Router();

foodRouter.get("/", checkAuth, foodController.getFoodController);
foodRouter.post("/", checkAuth, foodController.addFoodController);

foodRouter.get("/week_compare", checkAuth, foodController.getFoodStatisticsInfoController);
foodRouter.get("/:uuid/food", checkAuth, foodController.getFoodEntriesByUserController);

foodRouter.get("/:uuid", checkAuth, foodController.getFoodEntriesByUserController);
foodRouter.post("/users", checkAuth, foodController.createFoodByUserController);
foodRouter.put("/", checkAuth, foodController.updateFoodController);
foodRouter.delete("/:uuid", checkAuth, foodController.deleteFoodController);

