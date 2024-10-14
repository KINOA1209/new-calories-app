import { Response } from "express";
import { CommonRequest } from "@/types";
import { errorHandlerWrapper, getOneWeekAgo } from "@/utils";
import { foodService } from "@/services";
import httpStatus from "http-status";

const getFoodStatisticsInfoHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const { to } = req.query;
  const thisWeek = getOneWeekAgo(to);
  const prevWeek = getOneWeekAgo(thisWeek);
  // Call the service function
  const lastWeekFoods = await foodService.getAllFoodsFor14Days({
    from: new Date(thisWeek),
    to: new Date(to),
  });
  const thisWeekFoods = await foodService.getAllFoodsFor14Days({
    from: new Date(prevWeek),
    to: new Date(thisWeek),
  });
  
  const averageCalories = await foodService.getAverageCaloriesForAllUsers({
    from: new Date(thisWeek),
    to: new Date(to),
  });

  console.log(lastWeekFoods, thisWeekFoods, averageCalories);

  res.status(httpStatus.OK).json({ lastWeekFoods, thisWeekFoods, averageCalories });
};

export const getFoodStatisticsInfoController = errorHandlerWrapper(getFoodStatisticsInfoHandler);
