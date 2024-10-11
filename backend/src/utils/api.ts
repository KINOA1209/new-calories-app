import { Env } from "@/env";
import axios from "axios";

export const api = () => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      "x-app-key": Env.calroryKey,
      "x-app-id": Env.calroryID,
    },
    baseURL: Env.calroryUrl,
    timeout: 60000,
  });

  instance.interceptors.request.use(
    function (response: any) {
      return response;
    },
    function (error: any) {
      return Promise.reject(error);
    }
  );

  return instance;
};
