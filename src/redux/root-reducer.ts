import { combineReducers } from "redux";
import toggleCartReducer from "./cart/cart.reducer";
import shopReducer from "./shop/shop.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: toggleCartReducer,
  shop: shopReducer,
});

export type Store = ReturnType<typeof rootReducer>;

export default rootReducer;
