import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  USER_AUTHENTICATED,
  CHECK_USER_SESSION,
  FINISH_CHECK_USER_SESSION,
} from "./user.types";
import * as Actions from "./user.actions";
import { CurrentUser, Error } from "../../components/types";

export interface IUser {
  checkingUserSession: boolean;
  currentUser: CurrentUser;
  error: Error;
}

const initialState = {
  checkingUserSession: true,
  currentUser: null,
  error: null,
};

const userReducer = (
  currentState: IUser = initialState,
  action:
    | Actions.ISignInSuccess
    | Actions.ISignInFailed
    | Actions.ISignOutFailure
    | Actions.ISignOutSuccess
    | Actions.ISignUpFailureAction
    | Actions.IUserIsAuthenticated
    | Actions.ICheckUSerSession
    | Actions.IFinishCheckUSerSession
) => {
  switch (action.type) {
    case CHECK_USER_SESSION:
      return {
        ...currentState,
        checkingUserSession: true,
      };

    case FINISH_CHECK_USER_SESSION:
      return {
        ...currentState,
        checkingUserSession: false,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...currentState,
        currentUser: null,
        error: null,
      };

    case SIGN_IN_SUCCESS:
    case USER_AUTHENTICATED:
      return {
        ...currentState,
        checkingUserSession: false,
        currentUser: action.payload,
        error: null,
      };

    case SIGN_IN_FAILURE:
    case SIGN_OUT_FAILURE:
    case SIGN_UP_FAILURE:
      return {
        ...currentState,
        error: action.payload,
      };

    default:
      return currentState;
  }
};

export default userReducer;
