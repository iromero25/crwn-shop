import { combineReducers } from "redux";
import toggleCartReducer from "./cart/cart.reducer";
import shopReducer from "./shop/shop.reducer";
import userReducer from "./user/user.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persisConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // an array containig the key strings of the parts of the store that we want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: toggleCartReducer,
  shop: shopReducer,
});

export type Store = ReturnType<typeof rootReducer>;

export default persistReducer(persisConfig, rootReducer);
