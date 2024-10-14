import { all, fork } from "redux-saga/effects";
import { userSaga } from "./user.saga";
import { dataSaga } from "./data.saga";
import { foodSaga } from "./food.saga";
import { adminSaga } from "./admin.saga";

// auth
export function* appSaga() {
  yield all([fork(userSaga), fork(dataSaga), fork(foodSaga), fork(adminSaga)]);
}
