import { Response } from "express";
import { CommonRequest } from "@/types";
import { errorHandlerWrapper } from "@/utils";
import { foodService } from "@/services";
import httpStatus from "http-status";


const getFoodEntriesByUserHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const { uuid } = req.params;
  const foodEntries = await foodService.getFoodEntriesByUser(uuid);
  res.status(httpStatus.OK).json(foodEntries);
};


export const getFoodEntriesByUserController = errorHandlerWrapper(getFoodEntriesByUserHandler);