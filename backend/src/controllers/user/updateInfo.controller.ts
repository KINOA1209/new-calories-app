import { Response } from "express";
import { CommonRequest, UserType } from "@/types";
import { errorHandlerWrapper } from "@/utils";
import { userService } from "@/services";

const updateInfoHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const updateInfo = req.body as Partial<Omit<UserType, "password">>;
  userService.updateUser(updateInfo, req.user);
};

export const updateInfoController = errorHandlerWrapper(updateInfoHandler);