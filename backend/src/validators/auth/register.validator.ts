import { MESSAGE } from "@/constant";
import { body } from "express-validator";

export const signupValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage(MESSAGE.VALIDATION.NAME_IS_REQUIRED),
    body("email")
      .notEmpty()
      .withMessage(MESSAGE.VALIDATION.EMAIL_IS_REQUIRED)
      .isEmail()
      .withMessage(MESSAGE.VALIDATION.INVALID_EMAIL),
    body("password")
      .notEmpty()
      .withMessage(MESSAGE.VALIDATION.PASSWORD_IS_REQUIRED),
  ];
};
