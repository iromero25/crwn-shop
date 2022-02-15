import firebase from "firebase/compat/app";
import { all, put, takeEvery, select, call } from "redux-saga/effects";
import { GenericError, ICurrentUser, IItem } from "../../components/types";
import {
  auth,
  signInWithGoogle,
  getCurrentUser,
  addItemsIntoDBCurrentCart,
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
} from "./user.types";
import {
  signInSuccess,
  IStartEmailSignInAction,
  signInFailed,
  signOutSuccess,
  signOutFailure,
  ISignUpStartAction,
  signUpFailure,
  ISignInSuccess,
  userIsAuthenticated,
  finishCheckUserSession,
} from "./user.actions";
import { FirebaseUser } from "../../firebase/firebase.types";
import { createUserApi, getUserApi } from "../../api/api";

type AuthUserCredential = firebase.auth.UserCredential;

function* onUserAuthenticated(user: ICurrentUser) {
  yield put(userIsAuthenticated(user)); // this sets up the authenticated user in the store
  yield fetchUserCartSaga(user.id); // fetch the shop cart for the authenticated user
}

// when a user is authenticated, we do not want to do the same thing as signing in;
// (i.e. we do not want to add the existing items in the store to the DB like we do
// when signing in), instead, we just set the user in the store and fetch the items
function* isUserAuthenticated() {
  try {
    // this uses firebase to check if the user is authenticated, say on refreshing the page
    const userAuth: FirebaseUser = yield getCurrentUser();
    if (!userAuth) return;

    const firebaseAuthToken: string = yield userAuth.getIdToken();
    const user: ICurrentUser = yield call(getUserApi, firebaseAuthToken);
    if (!user) throw Error("Authenticated firebase user does not exist on the database");
    yield onUserAuthenticated(user);
  } catch (error: GenericError) {
    yield put(signInFailed(error.message));
  }
}

function* onCheckUserSessionSaga() {
  yield isUserAuthenticated();
  yield put(finishCheckUserSession());
}

function* onCheckUserSession() {
  yield takeEvery(CHECK_USER_SESSION, onCheckUserSessionSaga);
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

function* getUserFromDbAndSignIn(
  user: NonNullable<AuthUserCredential["user"]>,
  additionalData?: Record<string, any>
) {
  try {
    const firebaseAuthToken: string = yield user.getIdToken();
    let userData: ICurrentUser = yield call(getUserApi, firebaseAuthToken);
    if (!userData) {
      // I try to create a user in the DB here because the first time we sign in
      // with a user that doesn't exist in the database we need to be sure to
      // store it! This is not meant to happen several times, just every time
      // we sign in with a new user (when we use an existing one, we don't hit)
      // this line of code
      userData = yield call(
        createUserApi,
        firebaseAuthToken,
        user.displayName || "",
        user.email || "",
        additionalData
      );
    }
    yield put(signInSuccess(userData));
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
    if (!user) throw Error("Authenticated user is empty");
    yield getUserFromDbAndSignIn(user);
  } catch (error: GenericError) {
    yield put(signInFailed(error.message));
  }
}

function* signInWithGoogleSaga() {
  try {
    const { user }: AuthUserCredential = yield signInWithGoogle();
    if (!user) throw Error("Authenticated user is empty");
    yield getUserFromDbAndSignIn(user);
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
    if (!user) throw Error("Authenticated user is empty");
    yield getUserFromDbAndSignIn(user, { displayName });
  } catch (error: GenericError) {
    // maybe show a toast? or al teast a message on the DOM?
    yield put(signUpFailure(error.message));
  }
}

function* onSignUpStart() {
  yield takeEvery(SIGN_UP_START, signUp);
}

function* fetchUserCartSaga(userId: string) {
  yield put(fetchCartFromDB(userId));
}

// maybe this can be refactored
function* saveItemsInStoreIntoDB(userId: string) {
  const currentItems: IItem[] = yield select(selectCartItems);
  yield addItemsIntoDBCurrentCart(userId, currentItems);
  // yield put(addCartItem(currentItems[0])); // think of what needs to happen to have smomething like this working
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
