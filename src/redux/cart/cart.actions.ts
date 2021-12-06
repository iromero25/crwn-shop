import {
  ADD_CART_ITEM,
  CLEAR_CART,
  DECREASE_CART_ITEM_QTY,
  REMOVE_CART_ITEM,
  TOGGLE_CART_HIDDEN,
  UPDATE_CART,
} from "./cart.types";
import { Action } from "redux";
import { IItem } from "../../components/types";

export interface IClearCart extends Action<typeof CLEAR_CART> {}

export const clearCart = (): IClearCart => ({
  type: CLEAR_CART,
});

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

export interface IUpdateCart extends Action<typeof UPDATE_CART> {
  payload: IItem[];
}

export const updateCart = (cart: IItem[]): IUpdateCart => ({
  type: UPDATE_CART,
  payload: cart,
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
