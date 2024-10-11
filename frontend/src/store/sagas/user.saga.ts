import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { AppActions } from "store/store";
import { ResponseGenerator, TGetUserRequest, TSignInRequest, TSignUpRequest } from "types";
import { api } from "utils";

export function* signInSaga(action: PayloadAction<TSignInRequest>) {
  const { next, fail, ...data } = action.payload;
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().post(`/auth/sign-in`, { ...data })
    );
    if (result.data) {
      const { token, ...data } = result.data;
      yield put(AppActions.user.signInSuccess({ ...data }));
      next(token);
    }
  } catch (e: any) {
    console.log(e);
    fail(e.response.data);
  }
}

export function* signUpSaga(action: PayloadAction<TSignUpRequest>) {
  const { next, fail, ...data } = action.payload;
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().post(`/auth/sign-up`, { ...data })
    );
    if (result.data) {
      next();
    }
  } catch (e: any) {
    console.log(e);
    fail(e.response.data);
  }
}

export function* getUserSaga(action: PayloadAction<TGetUserRequest>) {
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().get("/user")
    );
    if (result.data) {
      yield put(AppActions.user.getUserSuccess(result.data));
    }
  } catch (e: any) {
    yield put(AppActions.user.getUserFailure());
    action.payload.next();
  }
}

export function* userSaga() {
  yield takeLatest(AppActions.user.signInRequest.type, signInSaga);
  yield takeLatest(AppActions.user.signUpRequest.type, signUpSaga);
  yield takeLatest(AppActions.user.getUserRequest.type, getUserSaga);
}
