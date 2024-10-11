import { dataController } from "@/controllers";
import { checkAuth } from "@/utils";
import { Router } from "express";

export const dataRouter = Router();

dataRouter.get("/instant", checkAuth, dataController.instantController);
