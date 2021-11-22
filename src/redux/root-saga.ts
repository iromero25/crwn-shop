import { all } from "redux-saga/effects";
import { fetchCollectionsStart } from "./shop/shop.sagas";
import { googleSignInStart, emailPasswordSignInStart } from "./user/user.sagas";

export default function* rootSaga() {
  yield all([fetchCollectionsStart(), googleSignInStart(), emailPasswordSignInStart()]);
}
