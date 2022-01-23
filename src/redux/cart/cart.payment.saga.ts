import { put, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import { paymentApi } from "../../api/api";
import { GenericError, ICartItemsCollection, ICurrentUser } from "../../components/types";
import { getCartItemsCollection, updateDBCart } from "../../firebase/firebase.utils";
import CustomError, { STRIPE_PAYMENT_ERROR } from "../../utils/CustomError";
import { selectCurrentUser } from "../user/user.selector";
import { IStartPaymentAction, updateCartFromDB } from "./cart.actions";
import { modifyShoppingCart } from "./cart.sagas";
import { MOVE_CART_TO_HISTORY } from "./cart.types";

export default function* payCartSaga(action: IStartPaymentAction) {
  const { id: userId }: ICurrentUser = yield select(selectCurrentUser);
  const { priceForStripe, token } = action.payload;
  let cartItemsCollection: ICartItemsCollection | undefined;

  try {
    // get the status of the store here (from the db)
    cartItemsCollection = yield getCartItemsCollection(userId);

    // INCREDIBLY IMPORTANT: we want the next line (modifying the  shopping cart)  to
    // execute AND finish before moving to the payment process: if modifying the cart
    // fails, then an error is thrown, the execution is then transferred to the catch
    // clause and the payment is not executed, which is  exaclty what we want.  Also,
    // the Redux cart goes back to the way it  was initially (as handled by the catch
    // clause over the `modifyShoppingCart` saga)

    // However, modifying the cart by yielding an action with the `put` effect like:

    // yield put(moveCartToHistory());

    // while seems to be doing the job, what it really  means is  that another  saga is
    // spawned to deal with that  side  effect and  we immedately move to the next line
    // of code, which in this case, is the payment. WE DON'T WANT THIS as modifying the
    // shopping cart might fail and if that happens, we want to stop executing the rest
    // of the saga.

    // by invoking the `modifyiShoppingCart` saga directly like the following line, we
    // make sure of not spawining a different saga: we use `yield` like `await` and so
    // we make sure the shopping cart is completely executed before moving on!
    yield modifyShoppingCart({ type: MOVE_CART_TO_HISTORY });
    yield paymentApi(priceForStripe, token);
    toast.success("Payment successfull");
  } catch (error: GenericError) {
    toast.error("Payment unsuccessful.");
    if (
      error instanceof CustomError &&
      error.getCode() === STRIPE_PAYMENT_ERROR &&
      cartItemsCollection
    ) {
      toast.error(error.message);
      // if there's an error with the stripe payment, we aim to revert the changes made in
      // the database before executing the payment. Since  this is an  async DB  operation,
      // it could fail. Chances of that happening are slim since if hit this lines of code,
      // it means we were able to modify the DB just  before executing the payment, and so
      // the DB should be available.

      // Worse case scenario if this fails is that user is not charged and the cart  is
      // lost, but now we fall into the domain of database availability/contingency and
      // that goes beyond the scope of this project.
      try {
        // another thing we could try is re-try updating the db maybe three times with 3,
        // 5 secs in between, just to be sure of re-trying if the initial rollback fails
        yield updateDBCart(userId, cartItemsCollection);
        yield put(updateCartFromDB(cartItemsCollection.currentCart)); // update Redux Cart
      } catch (error) {}
    }
    console.error(error.message);
  }
}
