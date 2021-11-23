import { all, put, takeEvery } from "redux-saga/effects";
import { SIGN_OUT_SUCCESS } from "../user/types";
import { clearCart } from "./cart.actions";

function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* onSignOutSuccess() {
  yield takeEvery(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export default function* cartSagas() {
  yield all([onSignOutSuccess()]);
}
