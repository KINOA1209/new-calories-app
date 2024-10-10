import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { FoodEntity, UserEntity } from "@/entities";
import "dotenv/config";
import { Env } from "@/env";

export const AppDataSource = new DataSource({
  type: "mysql",
  database: Env.dbName,
  host: Env.host,
  username: Env.username,
  password: Env.password,
  port: Env.dbPort,
  logging: false,
  synchronize: true,
  entities: [UserEntity, FoodEntity],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
});
