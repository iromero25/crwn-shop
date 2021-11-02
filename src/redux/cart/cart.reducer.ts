import { ADD_CART_ITEM, TOGGLE_CART_HIDDEN } from "./types";
import { IAddCartItemAction, IToggleCartHiddenAction } from "./cart.actions";
import { ICart } from "../../components/types";
import { addItemToCart } from "./cart.utils";

const initialState: ICart = {
  isCartHidden: true,
  cartItems: [],
};

const cartReducer = (
  currentState = initialState,
  action: IToggleCartHiddenAction | IAddCartItemAction
) => {
  switch (action.type) {
    case TOGGLE_CART_HIDDEN:
      return { ...currentState, isCartHidden: !currentState.isCartHidden };
    case ADD_CART_ITEM:
      return {
        ...currentState,
        cartItems: addItemToCart(action.payload, currentState.cartItems),
      };

    default:
      return currentState;
  }
};

export default cartReducer;
