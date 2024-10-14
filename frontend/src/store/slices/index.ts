import { combineReducers } from "@reduxjs/toolkit";
import { adminActions, adminReducers } from "./admin.slice";
import { userActions, userReducers } from "./user.slice";
import { dataActions, dataReducers } from "./data.slice";
import { foodActions, foodReducers } from "./food.slice";


export const Slices = combineReducers({
  admin: adminReducers,
  user: userReducers,
  data: dataReducers,
  food: foodReducers,
});

export const Actions = {
  admin: adminActions,
  user: userActions,
  data: dataActions,
  food: foodActions,
};
