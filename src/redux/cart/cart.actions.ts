import { ADD_CART_ITEM, TOGGLE_CART_HIDDEN } from "./types";
import { Action } from "redux";
import { IItem } from "../../components/types";

export interface IToggleCartHiddenAction extends Action<typeof TOGGLE_CART_HIDDEN> {}

const toggleCartHidden = (): IToggleCartHiddenAction => ({
  type: TOGGLE_CART_HIDDEN,
});

export interface IAddCartItemAction extends Action<typeof ADD_CART_ITEM> {
  payload: IItem;
}

const addCartItem = (cartItem: IItem): IAddCartItemAction => ({
  type: ADD_CART_ITEM,
  payload: cartItem,
});

export { toggleCartHidden, addCartItem };
