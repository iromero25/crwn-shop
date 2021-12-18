import { all, put, takeEvery, select } from "redux-saga/effects";
import { GenericError, ICurrentUser, IItem } from "../../components/types";
import { getCurrrentCartFromDb, updateDBCart } from "../../firebase/firebase.utils";
import { SIGN_OUT_SUCCESS } from "../user/types";
import { selectCurrentUser } from "../user/user.selector";
import {
  clearCart,
  IAddCartItemAction,
  IFetchUserCart,
  IRemoveCartItemAction,
  updateCart,
} from "./cart.actions";
import { selectCartItems } from "./cart.selectors";
import {
  ADD_CART_ITEM,
  DECREASE_CART_ITEM_QTY,
  FETCH_USER_CART,
  REMOVE_CART_ITEM,
} from "./cart.types";
import { decreaseItemFromCart, addItemToCart, removeItemFromCart } from "./cart.utils";

function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* onSignOutSuccess() {
  yield takeEvery(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

function* addCartItem(action: IAddCartItemAction) {
  // use saga's select effect to extract the user and cart item from the state
  const { id }: ICurrentUser = yield select(selectCurrentUser);
  const currentCart: IItem[] = yield select(selectCartItems);
  // maybe this is where we can check if the user is logged?
  const newCart = addItemToCart(action.payload, currentCart);
  yield put(updateCart(newCart)); // modify the redux store

  try {
    yield updateDBCart(id, newCart);
  } catch (error: GenericError) {
    yield put(updateCart(currentCart)); // Revert the operation on DB fail
    alert("Error trying to store the selected item to the cart. Please try again.");
  }
}

function* onAddCartItem() {
  yield takeEvery(ADD_CART_ITEM, addCartItem);
}

function* decreaseCartItem(action: IRemoveCartItemAction) {
  const { id }: ICurrentUser = yield select(selectCurrentUser);
  const currentCart: IItem[] = yield select(selectCartItems);
  const newCart = decreaseItemFromCart(action.payload, currentCart);

  // update the redux store before updating the DB to modify the
  // UI instantly and provide a better user experience
  yield put(updateCart(newCart));

  try {
    yield updateDBCart(id, newCart);
  } catch (error: GenericError) {
    yield put(updateCart(currentCart)); // Revert the operation on DB fail
    alert("Error trying to decrease the selected item from the cart. Please try again.");
  }
}

function* onDecreaseCartItem() {
  yield takeEvery(DECREASE_CART_ITEM_QTY, decreaseCartItem);
}

function* removeCartItem(action: IRemoveCartItemAction) {
  const { id }: ICurrentUser = yield select(selectCurrentUser);
  const currentCart: IItem[] = yield select(selectCartItems);
  const newCart = removeItemFromCart(action.payload, currentCart);
  yield put(updateCart(newCart));

  try {
    yield updateDBCart(id, newCart);
  } catch (error: GenericError) {
    yield put(updateCart(currentCart)); // Revert the operation on DB fail
    alert("Error trying to remove the selected item from the cart. Please try again.");
  }
}

function* onRemoveCartItem() {
  yield takeEvery(REMOVE_CART_ITEM, removeCartItem);
}

function* fetchUserCart(action: IFetchUserCart) {
  // do the asynchronous call to fetch the user's cart
  console.log(`fetchUserCart for user: ${action.payload}`);
  const userId = action.payload;
  // need to check the typing of this:
  const { currentCart }: { currentCart: IItem[] } = yield getCurrrentCartFromDb(userId);
  // I have the cart, what yshould I do wiht it?
  yield put(updateCart(currentCart));
}

function* onFetchUserCart() {
  yield takeEvery(FETCH_USER_CART, fetchUserCart);
}

export default function* cartSagas() {
  yield all([
    onSignOutSuccess(),
    onAddCartItem(),
    onDecreaseCartItem(),
    onRemoveCartItem(),
    onFetchUserCart(),
  ]);
}
