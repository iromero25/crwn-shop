import {
  ADD_CART_ITEM,
  CLEAR_CART,
  DECREASE_CART_ITEM_QTY,
  FETCH_CART_FROM_DB,
  REMOVE_CART_ITEM,
  MOVE_CART_TO_HISTORY,
  TOGGLE_CART_HIDDEN,
  UPDATE_CART_FROM_DB,
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

export interface IUpdateCartFromDB extends Action<typeof UPDATE_CART_FROM_DB> {
  payload: IItem[];
}

export const updateCartFromDB = (cart: IItem[]): IUpdateCartFromDB => ({
  type: UPDATE_CART_FROM_DB,
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

export interface IFetchCartFromDB extends Action<typeof FETCH_CART_FROM_DB> {
  payload: string;
}

export const fetchCartFromDB = (userId: string): IFetchCartFromDB => ({
  type: FETCH_CART_FROM_DB,
  payload: userId,
});

export interface IMoveCartToHistory extends Action<typeof MOVE_CART_TO_HISTORY> {}

export const moveCartToHistory = () => ({
  type: MOVE_CART_TO_HISTORY,
});
