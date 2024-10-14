import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { AppActions } from "store/store";
import { ResponseGenerator, TGetWeekFoodRequest,TGetUserFoodRequest, TAddUserFoodRequest, TUpdateUserFoodRequest, TDeleteUserFoodRequest } from "types";
import { api } from "utils";

export function* getUserListSaga() {
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().get("/user/users")
    );
    if(result.data) {
      yield put(AppActions.admin.getUserListSuccess([...result.data]));
    }
  } catch (e: any) {
    console.log(e);
  }
}

export function* getUserFoodSaga(action: PayloadAction<TGetUserFoodRequest>) {
  const { uuid } = action.payload;  
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().get(`/food/${uuid}`)
    );
    if(result.data) {
      console.log(result.data);
      yield put(AppActions.admin.getUserFoodSuccess([...result.data]));
    }
  } catch (e: any) {
    console.log(e);
  }
}



export function* addUserFoodSaga(action: PayloadAction<TAddUserFoodRequest>) {
  const { ...data } = action.payload;
  console.log (data)
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().post("/food/users", { ...data})
    );
    if(result.data) {
      yield put(AppActions.admin.addUserFoodSuccess({ ...action.payload, ...result.data }));
      console.log(result.data);
    }
  } catch (e: any) {
    console.log(e);
  }
}

export function* updateUserFoodSaga(action: PayloadAction<TUpdateUserFoodRequest>) {
  const { ...data } = action.payload; 
  console.log (data)
  try {
    const result: ResponseGenerator = yield call(
      async () => await api().put("/food", {...data})
    );
    if(result.data) {
      yield put(AppActions.admin.updateUserFoodSuccess({...action.payload}));
    }
  } catch (e: any) {
    console.log(e);
  }
}



export function* deleteUserFoodSaga(action: PayloadAction<TDeleteUserFoodRequest>) {

  const { uuid }  = action.payload; 
  console.log(uuid, "delete");

  try {
    const result: ResponseGenerator = yield call(
      async () => await api().delete(`/food/${uuid}`)
    );
    if(result) {
      yield put(AppActions.admin.deleteUserFoodSuccess({...action.payload}));
    }
  } catch (e: any) {
    console.log(e);
  }
}


export function* getWeekFoodSaga(action: PayloadAction<TGetWeekFoodRequest>) {
  const { to } = action.payload;

  try {
    const result: ResponseGenerator = yield call(
      async () => await api().get(`/food/week_compare/?to=${to}`)
    );

    if (result.data) {
      console.log("result.data", result.data); // Log the result data for debugging
      yield put(AppActions.admin.getWeekFoodSuccess({ ...result.data }));
    }
  } catch (e: any) {
    console.error("Get food for 14 days error:", e);
    //const { data, status } = e.response;
    //fail({ ...data, status });
  }
}

export function* adminSaga() {
  yield takeLatest(AppActions.admin.getWeekFoodRequest.type, getWeekFoodSaga);
  yield takeLatest(AppActions.admin.getUserListRequest.type, getUserListSaga);
  yield takeLatest(AppActions.admin.getUserFoodRequest.type, getUserFoodSaga);
  yield takeLatest(AppActions.admin.addUserFoodRequest.type, addUserFoodSaga);
  yield takeLatest(AppActions.admin.updateUserFoodRequest.type, updateUserFoodSaga);
  yield takeLatest(AppActions.admin.deleteUserFoodRequest.type, deleteUserFoodSaga);
}
