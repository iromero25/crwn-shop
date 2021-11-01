import { SET_CURRENT_USER } from "./types";
import { CurrentUser } from "../../components/types";
import { ISetCurrentUserAction } from "./user.actions";

const userReducer = (currentState: CurrentUser = null, action: ISetCurrentUserAction) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...action.payload };
    default:
      return currentState;
  }
};

export default userReducer;
