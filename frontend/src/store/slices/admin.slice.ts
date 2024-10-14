import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TAddFoodRequest,
  TFood,
  TGetWeekFoodRequest,
  TGetWeekFoodSuccess,
  TMember,
  TUser,
  TUserAverage,
} from "types";
import {
  TAddUserFoodSuccess,
  TDeleteUserFoodRequest,
  TDeleteUserFoodSuccess,
  TGetUserFoodRequest,
  TGetUserFoodSuccess,
  TGetUserListSuccess,
  TUpdateUserFoodRequest,
  TUpdateUserFoodSuccess,
} from "types";

interface IAdminState {
  food: TFood[];
  selectedUser: TUser | null;
  users: TMember[];
  lastWeekFoods: number;
  thisWeekFoods: number;
  averageCalories: TUserAverage[];
}

const initialState: IAdminState = {
  food: [],
  selectedUser: null,
  users: [],
  lastWeekFoods: 0,
  thisWeekFoods: 0,
  averageCalories: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getUserListRequest(_state: IAdminState) {},
    getUserListSuccess(
      state: IAdminState,
      action: PayloadAction<TGetUserListSuccess>
    ) {
      state.users = [...action.payload];
    },
    getUserFoodRequest(
      _state: IAdminState,
      _action: PayloadAction<TGetUserFoodRequest>
    ) {},
    getUserFoodSuccess(
      state: IAdminState,
      action: PayloadAction<TGetUserFoodSuccess>
    ) {
      state.food = [...action.payload];
    },
    addUserFoodRequest(
      _state: IAdminState,
      _action: PayloadAction<TAddFoodRequest>
    ) {},
    addUserFoodSuccess(
      state: IAdminState,
      action: PayloadAction<TAddUserFoodSuccess>
    ) {
      state.food = [...state.food, { ...action.payload }];
    },
    updateUserFoodRequest(
      _state: IAdminState,
      _action: PayloadAction<TUpdateUserFoodRequest>
    ) {},
    updateUserFoodSuccess(
      state: IAdminState,
      action: PayloadAction<TUpdateUserFoodSuccess>
    ) {
      state.food = [
        ...state.food.map((entry) => {
          return entry.uuid === action.payload.uuid
            ? { ...action.payload }
            : { ...entry };
        }),
      ];
    },
    deleteUserFoodRequest(
      _state: IAdminState,
      _action: PayloadAction<TDeleteUserFoodRequest>
    ) {},
    deleteUserFoodSuccess(
      state: IAdminState,
      action: PayloadAction<TDeleteUserFoodSuccess>
    ) {
      state.food = [
        ...state.food.filter((entry) => entry.uuid !== action.payload.uuid),
      ];
    },
    getWeekFoodRequest(
      _state: IAdminState,
      _action: PayloadAction<TGetWeekFoodRequest>
    ) {},
    getWeekFoodSuccess(
      state: IAdminState,
      action: PayloadAction<TGetWeekFoodSuccess>
    ) {
      const { lastWeekFoods, thisWeekFoods, averageCalories } = action.payload;
      state.lastWeekFoods = lastWeekFoods;
      state.thisWeekFoods = thisWeekFoods;
      state.averageCalories = [...averageCalories];
    },
  },
});

export const adminActions = adminSlice.actions;

export const adminReducers = adminSlice.reducer;
