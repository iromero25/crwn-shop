import { IItem } from "../../components/types";
import {
  IAddCartItemAction,
  IDecreaseItemQty,
  IRemoveCartItemAction,
} from "./cart.actions";

export const removeItemFromCart = (cartItem: IItem, cartItems: IItem[]) => {
  return cartItems.filter(item => item.id !== cartItem.id);
};

export const addItemToCart = (cartItem: IItem, cartItems: IItem[]) => {
  const cartItemInArray = cartItems.find(item => item.id === cartItem.id);
  if (!cartItemInArray) {
    return [...cartItems, { ...cartItem, quantity: 1 }];
  }

  return cartItems.map(item =>
    item.id === cartItem.id ? { ...item, quantity: (item?.quantity ?? 0) + 1 } : item
  );
};

export const decreaseItemFromCart = (cartItem: IItem, cartItems: IItem[]) => {
  const cartItemInArray = cartItems.find(item => item.id === cartItem.id);

  if (cartItemInArray?.quantity === 1) {
    return removeItemFromCart(cartItemInArray, cartItems);
  }

  return cartItems.map(item =>
    item.quantity && item.id === cartItem.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

export const createNewCartReducer = (
  action: IAddCartItemAction | IRemoveCartItemAction | IDecreaseItemQty,
  currentCart: IItem[]
) => {
  switch (action.type) {
    case "ADD_CART_ITEM": {
      return addItemToCart(action.payload, currentCart);
    }
    case "DECREASE_CART_ITEM_QTY": {
      return decreaseItemFromCart(action.payload, currentCart);
    }
    case "REMOVE_CART_ITEM": {
      return removeItemFromCart(action.payload, currentCart);
    }
    default:
      return currentCart;
  }
};
