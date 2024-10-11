import { CommonRequest } from "@/types";
import { api, errorHandlerWrapper } from "@/utils";
import { Response } from "express";

const instantHandler = async (
  req: CommonRequest,
  res: Response
): Promise<void> => {
  const { query } = req.query;
  const result = await api().get(`/instant/?query=${query}`);
  res.json(result.data.branded);
}

export const instantController = errorHandlerWrapper(instantHandler);
