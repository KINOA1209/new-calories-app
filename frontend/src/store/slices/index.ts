import { combineReducers } from "@reduxjs/toolkit";
import { userActions, userReducers } from "./user.slice"

export const Slices = combineReducers({
  user: userReducers,
});

export const Actions = {
  user: userActions,
};
