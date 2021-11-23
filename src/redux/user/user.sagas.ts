import firebase from "firebase/compat/app";
import { all, put, takeEvery } from "redux-saga/effects";
import {
  FirebaseUser,
  auth,
  createUserProfileDocument,
  DocumentRefType,
  DocumentSnapshotType,
  signInWithGoogle,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  CHECK_USER_SESSION,
  SIGN_OUT_START,
  START_EMAIL_SIGN_IN,
  START_GOOGLE_SIGN_IN,
} from "./types";
import {
  signInSuccess,
  IStartEmailSignInAction,
  signInFailed,
  signOutSuccess,
  signOutFailure,
} from "./user.actions";

type GenericError = any & { message: string };
type AuthUserCredential = firebase.auth.UserCredential;

function* isUserAuthenticated() {
  try {
    const userAuth: FirebaseUser = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error: GenericError) {
    yield put(signInFailed(error.message));
  }
}

function* onCheckUserSession() {
  yield takeEvery(CHECK_USER_SESSION, isUserAuthenticated);
}

function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error: GenericError) {
    yield put(signOutFailure(error.message));
  }
}

function* onSignOutStart() {
  yield takeEvery(SIGN_OUT_START, signOut);
}

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

function* emailPasswordSignInStart() {
  yield takeEvery(START_EMAIL_SIGN_IN, signInWithEmailAndPassword);
}

function* googleSignInStart() {
  yield takeEvery(START_GOOGLE_SIGN_IN, signInWithGoogleSaga);
}

export default function* userSagas() {
  yield all([
    googleSignInStart(),
    emailPasswordSignInStart(),
    onCheckUserSession(),
    onSignOutStart(),
  ]);
}
