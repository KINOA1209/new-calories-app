import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TGetUserRequest,
  TLogout,
  TSignInRequest,
  TSignUpRequest,
  TUser,
} from "types";

interface IUserState {
  auth: boolean;
  user: TUser | null;
}

const initialState: IUserState = {
  auth: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInRequest(
      _state: IUserState,
      _action: PayloadAction<TSignInRequest>
    ) {},
    signInSuccess(state: IUserState, action: PayloadAction<TUser>) {
      state.auth = true;
      state.user = { ...action.payload };
    },
    signUpRequest(
      _state: IUserState,
      _action: PayloadAction<TSignUpRequest>
    ) {},
    getUserRequest(
      _state: IUserState,
      _action: PayloadAction<TGetUserRequest>
    ) {},
    getUserSuccess(state: IUserState, action: PayloadAction<TUser>) {
      state.auth = true;
      state.user = { ...action.payload };
    },
    getUserFailure(state: IUserState) {
      state.auth = false;
      state.user = null;
    },
    logout(state: IUserState, action: PayloadAction<TLogout>) {
      state.auth = false;
      state.user = null;
      action.payload.next();
    },
  },
});

export const userActions = userSlice.actions;

export const userReducers = userSlice.reducer;
