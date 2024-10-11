import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TAddFoodRequest,
  TFood,
  TGetFoodRequest,
} from "types";

interface IFoodState {
  foods: TFood[];
}

const initialState: IFoodState = {
  foods: [],
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addFoodRequest(
      _state: IFoodState,
      _action: PayloadAction<TAddFoodRequest>
    ) {},
    addFoodSuccess(state: IFoodState, action: PayloadAction<TFood>) {
      state.foods = [...state.foods, { ...action.payload }];
    },
    getFoodRequest(
      _state: IFoodState,
      _action: PayloadAction<TGetFoodRequest>
    ) {},
    getFoodSuccess(state: IFoodState, action: PayloadAction<TFood[]>) {
      state.foods = [...action.payload];
    },
  },
});

export const foodActions = foodSlice.actions;

export const foodReducers = foodSlice.reducer;
