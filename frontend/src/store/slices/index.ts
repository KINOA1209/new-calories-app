import { combineReducers } from "@reduxjs/toolkit";
import { userActions, userReducers } from "./user.slice";
import { dataActions, dataReducers } from "./data.slice";

export const Slices = combineReducers({
  user: userReducers,
  data: dataReducers
});

export const Actions = {
  user: userActions,
  data: dataActions
};
