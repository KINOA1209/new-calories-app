import { TFail, TNext } from "./basic.type";

export type TAddFood = {
  date: Date | null;
  food: string;
  calrory: number;
};

export type TFoodError = {
  date: string;
  food: string;
};

export type TFood = TAddFood & { uuid: string };

export type TAddFoodRequest = TAddFood & TNext & TFail;

export type TPeriod = {
  from: Date | null;
  to: Date | null;
};

export type TPeriodError = {
  from: string;
  to: string;
};

export type TGetFoodRequest = TPeriod & TFail;



export type TGetWeekFoodRequest = {
  to: Date;
};

export type TUserAverage = {
  name: string;
  avg: number;
};
export type TGetWeekFoodSuccess = {
  lastWeekFoods: number;
  thisWeekFoods: number;
  averageCalories: TUserAverage[];
};
