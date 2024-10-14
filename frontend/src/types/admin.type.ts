import { TAddFood, TFood } from "./food.type";
import { TMember } from "./user.type";

export type TGetUserListSuccess = TMember[];

export type TGetUserFoodRequest = {
  uuid: string;
};

export type TGetUserFoodSuccess = TFood[];

export type TAddUserFoodRequest = {
  userId: string;
  food: TAddFood;
};



export type TAddUserFoodSuccess = TFood;

export type TUpdateUserFoodRequest = TFood;

export type TUpdateUserFoodSuccess = TFood;

export type TDeleteUserFoodRequest = { uuid: string };

export type TDeleteUserFoodSuccess = { uuid: string };
