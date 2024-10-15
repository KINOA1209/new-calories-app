import { Response } from "express";
import { CommonRequest } from "@/types";
import { errorHandlerWrapper } from "@/utils";
import { foodService } from "@/services";
import httpStatus from "http-status";

const addFoodHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const { date, food, calrory } = req.body;
  const newFood = await foodService.addFood({
    date,
    food,
    calrory,
    user: req.user,
  });
  res.json(newFood.uuid).status(httpStatus.CREATED);
};

export const addFoodController = errorHandlerWrapper(addFoodHandler);
