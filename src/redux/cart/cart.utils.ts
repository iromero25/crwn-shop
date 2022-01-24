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
import { cloneArrayOfObjects } from "../../utils/utils";

export const removeItemFromCart = (cartItem: IItem, cartItems: IItem[]) => {
  return cartItems.filter(item => item.id !== cartItem.id);
};

export const addItemToCart = (cartItemsToAdd: IItem[], existingCartItems: IItem[]) => {
  // If `existingCartItems` is not properly cloned, then the redux store is not updated
  // as expected as immutability is  not  respected: spreding an array of objects means
  // that we are assigning the object REFERENCES into a different array, but the refs
  // to the objects REMAIN. That's why we need to clone each object:
  const existingCartCloned: IItem[] = cloneArrayOfObjects(existingCartItems);

  cartItemsToAdd.forEach(cartItemToAdd => {
    const itemToModifyIndex = existingCartCloned.findIndex(
      item => item.id === cartItemToAdd.id
    );
    if (itemToModifyIndex > -1) {
      existingCartCloned[itemToModifyIndex].quantity! += 1; // you are mutating the object
    } else {
      existingCartCloned.push({ ...cartItemToAdd, quantity: 1 });
    }
  });

  return existingCartCloned;
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
// refactor: I am not sure we really need this:
export const getNewCartItemCollectionObj = (
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
        currentCart: addItemToCart([action.payload], currentCart), // update this
        //currentCart: addItemToCart(action.payload, currentCart), // update this
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
