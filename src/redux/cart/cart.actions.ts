import {
  ADD_CART_ITEM,
  DECREASE_CART_ITEM_QTY,
  REMOVE_CART_ITEM,
  TOGGLE_CART_HIDDEN,
} from "./types";
import { Action } from "redux";
import { IItem } from "../../components/types";

export interface IToggleCartHiddenAction extends Action<typeof TOGGLE_CART_HIDDEN> {}

export const toggleCartHidden = (): IToggleCartHiddenAction => ({
  type: TOGGLE_CART_HIDDEN,
});

export interface IAddCartItemAction extends Action<typeof ADD_CART_ITEM> {
  payload: IItem;
}

export const addCartItem = (cartItem: IItem): IAddCartItemAction => ({
  type: ADD_CART_ITEM,
  payload: cartItem,
});

export interface IRemoveCartItemAction extends Action<typeof REMOVE_CART_ITEM> {
  payload: IItem;
}

export const clearItemFromCart = (cartItem: IItem): IRemoveCartItemAction => ({
  type: REMOVE_CART_ITEM,
  payload: cartItem,
});

export interface IDecreaseItemQty extends Action<typeof DECREASE_CART_ITEM_QTY> {
  payload: IItem;
}

export const decreaseItemQty = (cartItem: IItem): IDecreaseItemQty => ({
  type: DECREASE_CART_ITEM_QTY,
  payload: cartItem,
});
