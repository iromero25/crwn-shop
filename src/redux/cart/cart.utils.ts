import { IItem, ICartItemsCollection, ICartHistory } from "../../components/types";
import {
  ADD_CART_ITEM,
  DECREASE_CART_ITEM_QTY,
  REMOVE_CART_ITEM,
  MOVE_CART_TO_HISTORY,
} from "./cart.types";
import {
  IAddCartItemAction,
  IRemoveCartItemAction,
  IDecreaseItemQty,
  IMoveCartToHistory,
} from "./cart.actions";
import uniqid from "uniqid";

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

// this function returns the (cart) object that will be used to update
// the `cartItems` collection at the database, THIS IS NOT A REDUCER:
export const databaseCartItemToUpdate = (
  currentCart: IItem[],
  action:
    | IAddCartItemAction
    | IRemoveCartItemAction
    | IDecreaseItemQty
    | IMoveCartToHistory
): ICartItemsCollection => {
  switch (action.type) {
    case ADD_CART_ITEM:
      return {
        currentCart: addItemToCart(action.payload, currentCart),
      };

    case DECREASE_CART_ITEM_QTY:
      return {
        currentCart: decreaseItemFromCart(action.payload, currentCart),
      };

    case REMOVE_CART_ITEM:
      return {
        currentCart: removeItemFromCart(action.payload, currentCart),
      };

    case MOVE_CART_TO_HISTORY:
      const transactionId: string = uniqid.time();
      const newCartHistoryEntry: ICartHistory["anyKey"] = {
        storedAt: new Date(),
        purchasedItems: currentCart,
      };

      // following firebase's docs, the key for `cartHistory` in the object returned by
      // this function needs to be in dot notation in order to be added to the DB without
      // overriding/affecting the rest of the `cartHistory` data at the database, see:
      // https://firebase.google.com/docs/firestore/manage-data/add-data#update_fields_in_nested_objects
      return {
        currentCart: [],
        [`cartHistory.${transactionId}`]: newCartHistoryEntry,
      };

    default:
      return { currentCart };
  }
};
