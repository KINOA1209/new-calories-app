import { Response } from "express";
import { CommonRequest } from "@/types";
import { errorHandlerWrapper } from "@/utils";
import httpStatus from "http-status";

const getUserHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const {name, email, role, calrory, ...other} = req.user;
  res.json({name, email, role, calrory}).status(httpStatus.OK);
};

export const getUserController = errorHandlerWrapper(getUserHandler);
