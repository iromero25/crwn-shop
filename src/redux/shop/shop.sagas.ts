import { call, put, takeEvery } from "redux-saga/effects";
import {
  convertCollectionSnapshotToMap,
  firestore,
  SnapshopType,
} from "../../firebase/firebase.utils";
import { FETCH_COLLECTIONS_START } from "./types";
import { Collection } from "../../components/types";
import { addCollection, fetchCollectionError } from "./shop.actions";

function* fetchCollections() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot: SnapshopType = yield collectionRef.get();
    const collections: Collection = yield call(convertCollectionSnapshotToMap, snapshot);
    yield put(addCollection(collections));
  } catch (error: any & { message: string }) {
    yield put(fetchCollectionError(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeEvery(FETCH_COLLECTIONS_START, fetchCollections);
}
