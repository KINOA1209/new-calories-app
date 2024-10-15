import { Response } from "express";
import { CommonRequest } from "@/types";
import { errorHandlerWrapper } from "@/utils";
import { foodService } from "@/services";
import httpStatus from "http-status";

const getFoodHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const { from, to } = req.query;
  const foods = await foodService.getFoods({
    from: new Date(from),
    to: new Date(to),
    user: req.user,
  });
  res.json(foods).status(httpStatus.CREATED);
};

export const getFoodController = errorHandlerWrapper(getFoodHandler);
