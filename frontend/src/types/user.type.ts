import { TFail, TNext } from "./basic.type";

export type TUser = Omit<TSignUp, "password"> & {
  role: number;
  calrory: number;
  uuid: string;
};

export type TMember = Pick<TUser, "name" | "uuid">;

export type TData = {
  servingUnit: string;
  nixBrandId: string;
  brandType: 2;
  foodName: string;
  servingQty: number;
  nfCalories: number;
  nixItemId: string;
  photo: {
    thumb: string;
  };
  brandName: string;
  region: number;
  brandNameItemName: string;
  locale: string;
};

export type TFetchData = {
  serving_unit: string;
  nix_brand_id: string;
  brand_type: 2;
  food_name: string;
  serving_qty: number;
  nf_calories: number;
  nix_item_id: string;
  photo: {
    thumb: string;
  };
  brand_name: string;
  region: number;
  brand_name_item_name: string;
  locale: string;
};

export type TSignIn = Omit<TSignUp, "name">;

export type TSignInRequest = TSignIn & {
  next: (token: string) => void;
} & TFail;

export type TSignUpRequest = TSignUp & TNext & TFail;

export type TGetUserRequest = TNext;

export type TLogout = TNext;

export type TSignUp = {
  name: string;
  email: string;
  password: string;
};
