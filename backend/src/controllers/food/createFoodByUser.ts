import { Response } from "express";
import { CommonRequest } from "@/types";
import { errorHandlerWrapper } from "@/utils";
import { foodService } from "@/services";
import httpStatus from "http-status";

const createFoodByUserHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const { userId, date, food, calrory } = req.body;
  // uuid is userId
  console.log (req.body);
  const newFood = await foodService.addFood({
    date,
    calrory,
    food,
    user: userId
  });
  res.json(newFood.uuid).status(httpStatus.CREATED);
};

export const createFoodByUserController = errorHandlerWrapper(createFoodByUserHandler);
