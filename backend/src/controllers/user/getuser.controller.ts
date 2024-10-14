import { Response } from "express";
import { CommonRequest } from "@/types";
import { errorHandlerWrapper } from "@/utils";
const httpStatus = require('http-status');

const getUserHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const {name, email, role, calrory, ...other} = req.user;
  res.json({name, email, role, calrory}).status(httpStatus.OK);
};

export const getUserController = errorHandlerWrapper(getUserHandler);
