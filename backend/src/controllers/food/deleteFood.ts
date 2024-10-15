import { Response } from "express";
import { CommonRequest } from "@/types";
import { errorHandlerWrapper } from "@/utils";
import { foodService } from "@/services";
import httpStatus from "http-status";
import { NotFoundError } from "@/errors";
import { MESSAGE } from "@/constant";

const deleteFoodHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const  { uuid }  = req.params;
 
  const success = await foodService.deleteFood(uuid);

  if (!success) {
    
    throw new NotFoundError(MESSAGE.ERROR.FOOD_NOT_FOUND);
  }

  res.status(httpStatus.NO_CONTENT).json(success);
};

export const deleteFoodController = errorHandlerWrapper(deleteFoodHandler);
