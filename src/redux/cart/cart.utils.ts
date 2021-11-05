import { IItem } from "../../components/types";

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
