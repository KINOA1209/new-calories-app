import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { AppActions } from "store/store";
import { ResponseGenerator } from "types";
import { api } from "utils";

export function* getDataSaga(action: PayloadAction<string>) {
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().get(`/data/instant/?query=${action.payload}`)
    );
    if (result.data) {
      yield put(AppActions.data.getDataSuccess(result.data));
    }
  } catch (e: any) {
    console.log(e);
  }
}

export function* getSearchDataSaga(action: PayloadAction<string>) {
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().get(`/data/instant/?query=${action.payload}`)
    );
    if (result.data) {
      yield put(AppActions.data.getSearchDataSuccess(result.data));
    }
  } catch (e: any) {
    console.log(e);
  }
}

export function* dataSaga() {
  yield takeLatest(AppActions.data.getDataRequest.type, getDataSaga);
  yield takeLatest(
    AppActions.data.getSearchDataRequest.type,
    getSearchDataSaga
  );
}
