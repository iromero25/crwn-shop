import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  DECREASE_CART_ITEM_QTY,
  TOGGLE_CART_HIDDEN,
} from "./types";
import {
  IAddCartItemAction,
  IRemoveCartItemAction,
  IToggleCartHiddenAction,
  IDecreaseItemQty,
} from "./cart.actions";
import { ICart } from "../../components/types";
import { addItemToCart, removeItemFromCart, decreaseItemFromCart } from "./cart.utils";

const initialState: ICart = {
  isCartHidden: true,
  cartItems: [],
};

const cartReducer = (
  currentState = initialState,
  action:
    | IToggleCartHiddenAction
    | IAddCartItemAction
    | IRemoveCartItemAction
    | IDecreaseItemQty
) => {
  const { cartItems, isCartHidden } = currentState;

  switch (action.type) {
    case TOGGLE_CART_HIDDEN:
      return { ...currentState, isCartHidden: !isCartHidden };

    case ADD_CART_ITEM:
      return {
        ...currentState,
        cartItems: addItemToCart(action.payload, cartItems),
      };

    case REMOVE_CART_ITEM:
      return {
        ...currentState,
        cartItems: removeItemFromCart(action.payload, cartItems),
      };

    case DECREASE_CART_ITEM_QTY:
      return {
        ...currentState,
        cartItems: decreaseItemFromCart(action.payload, cartItems),
      };

    default:
      return currentState;
  }
};

export default cartReducer;
