import { CONST, MESSAGE } from "@/constant";
import { DuplicateError } from "@/errors";
import { userService } from "@/services";
import { CommonRequest } from "@/types";
import { encryptPassword, errorHandlerWrapper } from "@/utils";
import { Response } from "express";
import httpStatus from "http-status";

const signupHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  const hashPassword = await encryptPassword(password);
  const user = await userService.createUser({
    name,
    email,
    password: hashPassword,
    calrory: CONST.CALRORY_LIMIT
  });
  if (!user) throw new DuplicateError(MESSAGE.ERROR.EMAIL_ALREADY_EXISTS);
  res.json({ user }).status(httpStatus.CREATED);
};

export const signupController = errorHandlerWrapper(signupHandler);
