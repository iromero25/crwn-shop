import { put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { ICartItemsCollection, ICurrentUser, IItem } from "../../components/types";
import { getCartItemsCollection, updateDBCart } from "../../firebase/firebase.utils";
import { SIGN_OUT_SUCCESS } from "../user/user.types";
import { selectCurrentUser } from "../user/user.selector";
import { toast } from "react-toastify";
import { selectCartItems } from "./cart.selectors";
import { getNewCartItemCollectionObj } from "./cart.utils";
import {
  clearCart,
  fetchCartFromDB,
  IAddCartItemAction,
  IDecreaseItemQty,
  IFetchCartFromDB,
  IMoveCartToHistory,
  IRemoveCartItemAction,
  updateCartFromDB,
} from "./cart.actions";
import * as Types from "./cart.types";
import CustomError, { MODIFY_SHOPPING_CART_ERROR } from "../../utils/CustomError";
import payCartSaga from "./cart.payment.saga";

function* clearCartOnSignOut() {
  yield put(clearCart());
}

/**
 * Modifies the shopping cart both at the store and at the DB in a sync fashion
 * @param action
 */
export function* modifyShoppingCart(
  action:
    | IAddCartItemAction
    | IRemoveCartItemAction
    | IDecreaseItemQty
    | IMoveCartToHistory
) {
  const currentCart: IItem[] = yield select(selectCartItems);
  const currentUser: ICurrentUser = yield select(selectCurrentUser);
  const newCartItemCollection = getNewCartItemCollectionObj(currentCart, action);

  // Modify only the cart items (not the history) at the redux store:
  yield put(updateCartFromDB(newCartItemCollection.currentCart));

  if (currentUser) {
    try {
      // update the DB only if the user is logged in
      // this will replace the DB `cartItem` collection with the object passed as parameter
      yield updateDBCart(currentUser.id, newCartItemCollection);
      // yield new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     reject("some error");
      //   }, 1500);
      // });
    } catch {
      // at the moment, paying a cart is the only action triggering a `MoveCartToHistory` action
      const isPaymentProcess = action.type === Types.MOVE_CART_TO_HISTORY;
      const errorMessage = isPaymentProcess ? "Payment Error: " : "";
      toast.error(
        `${errorMessage}Error trying to modify the shopping cart. Please try again.`
      );
      // Revert the contents of the store on fail WITH the actual content of
      // the items in the DB: (I think this is very clever!)
      yield put(fetchCartFromDB(currentUser.id));

      if (isPaymentProcess) {
        throw new CustomError(
          "Error trying to modify the shopping cart",
          MODIFY_SHOPPING_CART_ERROR,
          "Custom Error"
        );
      }
    }
  }
}

// do the asynchronous call to fetch the user's cart
function* fetchUserCart(action: IFetchCartFromDB) {
  const userId = action.payload;
  // we can get the userId from the store!!! ---> this is something to modify!!
  const { currentCart }: ICartItemsCollection = yield getCartItemsCollection(userId);
  yield put(updateCartFromDB(currentCart));
}

export default function* cartSagas() {
  yield takeEvery(SIGN_OUT_SUCCESS, clearCartOnSignOut);
  yield takeEvery(Types.FETCH_CART_FROM_DB, fetchUserCart);
  yield takeEvery(Types.START_PAYMENT_PROCESS, payCartSaga);
  yield takeLatest(
    [
      Types.ADD_CART_ITEM,
      Types.DECREASE_CART_ITEM_QTY,
      Types.REMOVE_CART_ITEM,
      Types.MOVE_CART_TO_HISTORY,
    ],
    modifyShoppingCart
  );
}
