import firebase from "firebase/compat/app";
import { put, takeEvery } from "redux-saga/effects";
import {
  auth,
  createUserProfileDocument,
  DocumentRefType,
  DocumentSnapshotType,
  signInWithGoogle,
} from "../../firebase/firebase.utils";
import { START_EMAIL_SIGN_IN, START_GOOGLE_SIGN_IN } from "./types";
import { signInSuccess, IStartEmailSignInAction, signInFailed } from "./user.actions";

type GenericError = any & { message: string };
type AuthUserCredential = firebase.auth.UserCredential;

function* getSnapshotFromUserAuth(user: AuthUserCredential["user"]) {
  try {
    const userRef: DocumentRefType = yield createUserProfileDocument(user);
    const userSnapshot: DocumentSnapshotType = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error: GenericError) {
    yield put(signInFailed(error.message));
  }
}

function* signInWithEmailAndPassword({
  payload: { email, password },
}: IStartEmailSignInAction) {
  try {
    const { user }: AuthUserCredential = yield auth.signInWithEmailAndPassword(
      email,
      password
    );
    yield getSnapshotFromUserAuth(user);
  } catch (error: GenericError) {}
}

function* signInWithGoogleSaga() {
  try {
    const { user }: AuthUserCredential = yield signInWithGoogle();
    yield getSnapshotFromUserAuth(user);
  } catch (error: GenericError) {
    yield put(signInFailed(error.message));
  }
}

export function* emailPasswordSignInStart() {
  yield takeEvery(START_EMAIL_SIGN_IN, signInWithEmailAndPassword);
}

export function* googleSignInStart() {
  yield takeEvery(START_GOOGLE_SIGN_IN, signInWithGoogleSaga);
}
