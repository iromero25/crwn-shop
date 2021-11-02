import { TOGGLE_CART_HIDDEN } from "./types";
import { IToggleCartHiddenAction } from "./cart.actions";

const toggleCartReducer = (currentState = false, action: IToggleCartHiddenAction) => {
  switch (action.type) {
    case TOGGLE_CART_HIDDEN:
      return !currentState;
    default:
      return currentState;
  }
};

export default toggleCartReducer;
