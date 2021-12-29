import { TOGGLE_CART_HIDDEN, CLEAR_CART, UPDATE_CART_FROM_DB } from "./cart.types";
import { IToggleCartHiddenAction, IClearCart, IUpdateCartFromDB } from "./cart.actions";
import { ICart } from "../../components/types";

const initialState: ICart = {
  isCartHidden: true,
  cartItems: [],
};

const cartReducer = (
  currentState = initialState,
  action: IToggleCartHiddenAction | IClearCart | IUpdateCartFromDB
) => {
  const { isCartHidden } = currentState;

  switch (action.type) {
    case CLEAR_CART:
      return {
        ...currentState,
        cartItems: [],
      };

    case TOGGLE_CART_HIDDEN:
      return { ...currentState, isCartHidden: !isCartHidden };

    case UPDATE_CART_FROM_DB:
      return {
        ...currentState,
        cartItems: [...action.payload],
      };

    default:
      return currentState;
  }
};

export default cartReducer;
