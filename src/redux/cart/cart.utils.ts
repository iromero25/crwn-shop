import { IItem } from "../../components/types";

export const addItemToCart = (cartItem: IItem, cartItems: IItem[]) => {
  const cartItemInArray = cartItems.find(item => item.id === cartItem.id);
  if (!cartItemInArray) {
    return [...cartItems, { ...cartItem, quantity: 1 }];
  }

  return cartItems.map(item =>
    item.id === cartItem.id ? { ...item, quantity: (item?.quantity ?? 0) + 1 } : item
  );
};
