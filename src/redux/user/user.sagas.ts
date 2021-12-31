import firebase from "firebase/compat/app";
import { all, put, takeEvery, select } from "redux-saga/effects";
import { GenericError, IItem } from "../../components/types";
import {
  FirebaseUser,
  auth,
  createUserProfileDocument,
  DocumentRefType,
  DocumentSnapshotType,
  signInWithGoogle,
  getCurrentUser,
  updateDBCart,
} from "../../firebase/firebase.utils";
import { fetchCartFromDB } from "../cart/cart.actions";
import { selectCartItems } from "../cart/cart.selectors";
import {
  CHECK_USER_SESSION,
  SIGN_IN_SUCCESS,
  SIGN_OUT_START,
  SIGN_UP_START,
  START_EMAIL_SIGN_IN,
  START_GOOGLE_SIGN_IN,
} from "./types";
import {
  signInSuccess,
  IStartEmailSignInAction,
  signInFailed,
  signOutSuccess,
  signOutFailure,
  ISignUpStartAction,
  signUpFailure,
  ISignInSuccess,
} from "./user.actions";

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

function* getSnapshotFromUserAuth(
  user: AuthUserCredential["user"],
  additionalData?: Record<string, any>
) {
  try {
    const userRef: DocumentRefType = yield createUserProfileDocument(
      user,
      additionalData
    );
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

function* signUp(action: ISignUpStartAction) {
  const {
    payload: { email, password, displayName },
  } = action;

  try {
    const { user }: AuthUserCredential = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );
    yield getSnapshotFromUserAuth(user, { displayName });
  } catch (error: GenericError) {
    yield put(signUpFailure(error.message));
  }
}

function* onSignUpStart() {
  yield takeEvery(SIGN_UP_START, signUp);
}

function* fetchUserCartSaga(userId: string) {
  yield put(fetchCartFromDB(userId));
}

function* saveItemsInStoreIntoDB(userId: string) {
  const currentItems: IItem[] = yield select(selectCartItems);
  yield updateDBCart(userId, currentItems);
}

function* onSignInSuccess(action: ISignInSuccess) {
  const userId = action.payload.id;
  yield saveItemsInStoreIntoDB(userId);
  yield fetchUserCartSaga(userId);
}

function* onSignIn() {
  yield takeEvery(SIGN_IN_SUCCESS, onSignInSuccess);
}

export default function* userSagas() {
  yield all([
    googleSignInStart(),
    emailPasswordSignInStart(),
    onCheckUserSession(),
    onSignOutStart(),
    onSignUpStart(),
    onSignIn(),
  ]);
}
