import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { AppActions } from "store/store";
import {
  ResponseGenerator,
  TAddFoodRequest,
  TGetFoodRequest,
} from "types";
import { api } from "utils";

export function* addFoodSaga(action: PayloadAction<TAddFoodRequest>) {
  const { next, fail, ...data } = action.payload;
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().post("/food", { ...data })
    );
    if (result.data) {
      yield put(
        AppActions.food.addFoodSuccess({ ...action.payload, uuid: result.data })
      );
      next();
    }
  } catch (e: any) {
    console.log(e);
    const { data, status } = e.response;
    fail({ ...data, status });
  }
}

export function* getFoodSaga(action: PayloadAction<TGetFoodRequest>) {
  const { from, to, fail } = action.payload;
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().get(`/food/?from=${from}&to=${to}`)
    );
    if (result.data) {
      console.log(result.data);
      yield put(AppActions.food.getFoodSuccess([...result.data]));
    }
  } catch (e: any) {
    console.log(e);
    const { data, status } = e.response;
    fail({ ...data, status });
  }
}



// Main saga watcher
export function* foodSaga() {
  yield takeLatest(AppActions.food.addFoodRequest.type, addFoodSaga);
  yield takeLatest(AppActions.food.getFoodRequest.type, getFoodSaga);
}
