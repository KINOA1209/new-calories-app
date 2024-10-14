import { UserEntity } from "@/entities";

export type FoodType = {
  date: Date;
  food: string;
  calrory: number;
  user: UserEntity;
};

export type UpdateFoodType = Omit<FoodType, "user"> & { uuid: string };

export type GetFoodType = {
  from: Date;
  to: Date;
  user: UserEntity;
};

export type GetFood14Type = {
  from: Date;
  to: Date;
};
