import { createSelector } from "reselect";
import { Store } from "../root-reducer";

const selectCart = (state: Store) => state.cart;

export const selectCartItems = createSelector([selectCart], cart => cart.cartItems);

export const selectIsCartHidden = createSelector([selectCart], cart => cart.isCartHidden);

export const selectCartItemsCount = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((accumulator, cartItem) => accumulator + (cartItem?.quantity ?? 0), 0)
);

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce(
    (accumulator, cartItem) => accumulator + cartItem.price * (cartItem?.quantity ?? 1),
    0
  )
);
