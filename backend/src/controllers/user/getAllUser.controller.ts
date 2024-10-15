import { Response } from "express";
import { CommonRequest } from "@/types";
import { errorHandlerWrapper } from "@/utils";
import { userService } from "@/services";
import httpStatus from "http-status";

const getAllUsersHandler = async (req: CommonRequest, res: Response): Promise<void> => {
  const users = await userService.getAllUsers();
  res.status(httpStatus.OK).json(users);
};


export const getAllUsersController = errorHandlerWrapper(getAllUsersHandler);