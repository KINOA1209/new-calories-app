import { combineReducers } from "@reduxjs/toolkit";
import { userActions, userReducers } from "./user.slice";
import { dataActions, dataReducers } from "./data.slice";
import { foodActions, foodReducers } from "./food.slice";


export const Slices = combineReducers({
  user: userReducers,
  data: dataReducers,
  food: foodReducers,
});

export const Actions = {
  user: userActions,
  data: dataActions,
  food: foodActions,
};
