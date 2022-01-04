import { all, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { ICurrentUser, IItem } from "../../components/types";
import { getCurrrentCartFromDb, replaceDBCart } from "../../firebase/firebase.utils";
import { SIGN_OUT_SUCCESS } from "../user/user.types";
import { selectCurrentUser } from "../user/user.selector";
import { toast } from "react-toastify";
import {
  clearCart,
  fetchCartFromDB,
  IAddCartItemAction,
  IDecreaseItemQty,
  IFetchCartFromDB,
  IRemoveCartItemAction,
  updateCartFromDB,
} from "./cart.actions";
import { selectCartItems } from "./cart.selectors";
import {
  ADD_CART_ITEM,
  DECREASE_CART_ITEM_QTY,
  FETCH_CART_FROM_DB,
  REMOVE_CART_ITEM,
} from "./cart.types";
import { createNewCartReducer } from "./cart.utils";

function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* onSignOutSuccess() {
  yield takeEvery(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

// to modify the shopping cart both at the store and at the DB in a sync fashion
function* modifyShoppingCart(
  action: IAddCartItemAction | IRemoveCartItemAction | IDecreaseItemQty
) {
  // use saga's select effect to extract the cart from the state
  const currentCart: IItem[] = yield select(selectCartItems);
  const newCart = createNewCartReducer(action, currentCart);
  yield put(updateCartFromDB(newCart)); // modify the redux store

  // use saga's select effect to extract the user from the state
  const currentUser: ICurrentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      // update the DB only if the user is logged in
      yield replaceDBCart(currentUser.id, newCart);
    } catch {
      toast.error("Error trying to modify the shopping cart. Please try again.");
      // Revert the contents of the store on fail WITH the actual content of
      // the items in the DB:
      yield put(fetchCartFromDB(currentUser.id));
    }
  }
}

function* onCartChange() {
  // it is so much better  to  take the  latest  modification to the database
  // (the saga will cancel the previous operation once it receives a new one)
  // since we do not need to modify the DB every time an item is modified; we
  // just need the last one
  yield takeLatest(
    [ADD_CART_ITEM, DECREASE_CART_ITEM_QTY, REMOVE_CART_ITEM],
    modifyShoppingCart
  );
}

// do the asynchronous call to fetch the user's cart
function* fetchUserCart(action: IFetchCartFromDB) {
  const userId = action.payload;
  const currentCart: IItem[] = yield getCurrrentCartFromDb(userId);
  yield put(updateCartFromDB(currentCart));
}

function* onFetchCartFromDB() {
  yield takeEvery(FETCH_CART_FROM_DB, fetchUserCart);
}

export default function* cartSagas() {
  yield all([onSignOutSuccess(), onCartChange(), onFetchCartFromDB()]);
}
