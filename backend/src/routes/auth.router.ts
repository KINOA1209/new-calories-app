import { Router } from "express";

import { authController } from "@/controllers";
import { authValidator } from "@/validators";

export const authRouter = Router();

authRouter.post(
  "/sign-in",
  authValidator.signinValidator(),
  authController.signinController
);

authRouter.post(
  "/sign-up",
  authValidator.signupValidator(),
  authController.signupController
);
