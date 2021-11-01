import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  currentUser: userReducer,
});

export type Store = ReturnType<typeof rootReducer>;

export default rootReducer;
