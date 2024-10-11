import { MESSAGE } from "@/constant";
import { body } from "express-validator";

export const signinValidator = () => {
  return [
    body("email")
      .exists()
      .withMessage(MESSAGE.VALIDATION.EMAIL_IS_REQUIRED)
      .isEmail()
      .withMessage(MESSAGE.VALIDATION.INVALID_EMAIL),
    body("password")
      .exists()
      .withMessage(MESSAGE.VALIDATION.PASSWORD_IS_REQUIRED),
  ];
};
