import { Response } from "express";
import { CommonRequest, UpdateFoodType } from "@/types";
import { foodService } from "@/services";
import httpStatus from "http-status";
import { errorHandlerWrapper } from "@/utils";
import { NotFoundError } from "@/errors";
import { MESSAGE } from "@/constant";


export const updateFoodHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const updatedFoodData = req.body as UpdateFoodType;
  const updatedFood = await foodService.updateFood(updatedFoodData);
  if (updatedFood) {
    res.status(httpStatus.OK).json(updatedFood);
  } else {
    throw new NotFoundError(MESSAGE.ERROR.FOOD_NOT_FOUND);
  }
};

export const updateFoodController = errorHandlerWrapper(updateFoodHandler);
