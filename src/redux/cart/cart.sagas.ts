import { Action } from "redux";
import { all, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { ICartItemsCollection, ICurrentUser, IItem } from "../../components/types";
import { getCartItemsCollection, updateDBCart } from "../../firebase/firebase.utils";
import { SIGN_OUT_SUCCESS } from "../user/user.types";
import { selectCurrentUser } from "../user/user.selector";
import { toast } from "react-toastify";
import { selectCartItems } from "./cart.selectors";
import { databaseCartItemToUpdate } from "./cart.utils";
import {
  clearCart,
  fetchCartFromDB,
  IFetchCartFromDB,
  updateCartFromDB,
} from "./cart.actions";
import {
  ADD_CART_ITEM,
  DECREASE_CART_ITEM_QTY,
  FETCH_CART_FROM_DB,
  REMOVE_CART_ITEM,
  MOVE_CART_TO_HISTORY,
} from "./cart.types";

function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* onSignOutSuccess() {
  yield takeEvery(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

// this will modify the shopping cart both at the store and at the DB in a sync fashion
function* modifyShoppingCart(action: Action) {
  const currentCart: IItem[] = yield select(selectCartItems);
  const currentUser: ICurrentUser = yield select(selectCurrentUser);
  const newCartItemCollection = databaseCartItemToUpdate(currentCart, action);

  // modify only the cart items (not the history) at the redux store:
  yield put(updateCartFromDB(newCartItemCollection.currentCart));

  if (currentUser) {
    try {
      // update the DB only if the user is logged in
      // this will replace the DB `cartItem` collection with the object passed as parameter
      yield updateDBCart(currentUser.id, newCartItemCollection);
    } catch {
      toast.error("Error trying to modify the shopping cart. Please try again.");
      // Revert the contents of the store on fail WITH the actual content of
      // the items in the DB: (I think this is very clever!)
      yield put(fetchCartFromDB(currentUser.id));
    }
  }
}

function* onCartChange() {
  // it's better to take the latest modification to the DB (the saga will cancel
  // the previous operation once it receives a new one): we don't need to modify
  // the DB every time an item is modified; we just need the last one
  yield takeLatest(
    [ADD_CART_ITEM, DECREASE_CART_ITEM_QTY, REMOVE_CART_ITEM, MOVE_CART_TO_HISTORY],
    modifyShoppingCart
  );
}

// do the asynchronous call to fetch the user's cart
function* fetchUserCart(action: IFetchCartFromDB) {
  const userId = action.payload;
  const { currentCart }: ICartItemsCollection = yield getCartItemsCollection(userId);
  yield put(updateCartFromDB(currentCart));
}

function* onFetchCartFromDB() {
  yield takeEvery(FETCH_CART_FROM_DB, fetchUserCart);
}

export default function* cartSagas() {
  yield all([onSignOutSuccess(), onCartChange(), onFetchCartFromDB()]);
}
