import { EnvType } from "@/types";
import "dotenv/config";

export const Env: EnvType = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.PORT) || 8000,
  dbPort: Number(process.env.DB_PORT) || 3306,
  dbName: process.env.DB_NAME,
  secretKey: process.env.SECRET_KEY,
  expiresIn: Number(process.env.EXPIRE_TIME) || 3600,
  serverAddress: process.env.SERVER_ADDRESS || "localhost",
  version: process.env.VERSION || "v1",
  calroryID: process.env.CALRORY_ID,
  calroryKey: process.env.CALRORY_KEY,
  calroryUrl: process.env.CALRORY_URL
};
