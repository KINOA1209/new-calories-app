import { all, fork } from "redux-saga/effects";
import { userSaga } from "./user.saga";

// auth
export function* appSaga() {
  yield all([fork(userSaga)]);
}
