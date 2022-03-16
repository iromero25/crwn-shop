import { ICart } from "../../components/types";
import {
  TOGGLE_CART_HIDDEN,
  CLEAR_CART,
  UPDATE_CART_FROM_DB,
  FETCH_CART_FROM_DB,
} from "./cart.types";
import {
  IToggleCartHiddenAction,
  IClearCart,
  IUpdateCartFromDB,
  IFetchCartFromDB,
} from "./cart.actions";

const initialState: ICart = {
  isCartHidden: true,
  cartItems: [],
  isFetching: false,
};

const cartReducer = (
  currentState = initialState,
  action: IToggleCartHiddenAction | IClearCart | IUpdateCartFromDB | IFetchCartFromDB
) => {
  const { isCartHidden } = currentState;

  switch (action.type) {
    case FETCH_CART_FROM_DB:
      return {
        ...currentState,
        isFetching: true,
      };

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
        isFetching: false,
      };

    default:
      return currentState;
  }
};

export default cartReducer;
