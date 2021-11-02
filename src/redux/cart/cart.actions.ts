import { TOGGLE_CART_HIDDEN } from "./types";
import { Action } from "redux";

export interface IToggleCartHiddenAction extends Action<typeof TOGGLE_CART_HIDDEN> {}

const toggleCartHidden = (): IToggleCartHiddenAction => ({
  type: TOGGLE_CART_HIDDEN,
});

export default toggleCartHidden;
