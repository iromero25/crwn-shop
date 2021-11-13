import { take, call, put } from "redux-saga/effects";
import {
  convertCollectionSnapshotToMap,
  firestore,
  SnapshopType,
} from "../../firebase/firebase.utils";
import { FETCH_COLLECTIONS_START } from "./types";
import { Collection } from "../../components/types";
import { addCollection, fetchCollectionError } from "./shop.actions";

export function* fetchCollections() {
  while (true) {
    try {
      yield take(FETCH_COLLECTIONS_START);
      const collectionRef = firestore.collection("collections");
      const snapshot: SnapshopType = yield collectionRef.get();
      const collections: Collection = yield call(
        convertCollectionSnapshotToMap,
        snapshot
      );
      yield put(addCollection(collections));
    } catch (error: any & { message: string }) {
      yield put(fetchCollectionError(error.message));
    }
  }
}
