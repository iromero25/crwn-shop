import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAILURE,
} from "./types";
import {
  ISignInSuccess,
  ISignInFailed,
  ISignOutFailure,
  ISignOutSuccess,
  ISignUpFailureAction,
} from "./user.actions";
import { CurrentUser, Error } from "../../components/types";

export interface IUser {
  currentUser: CurrentUser;
  error: Error;
}

const initialState = {
  currentUser: null,
  error: null,
};

const userReducer = (
  currentState: IUser = initialState,
  action:
    | ISignInSuccess
    | ISignInFailed
    | ISignOutFailure
    | ISignOutSuccess
    | ISignUpFailureAction
) => {
  switch (action.type) {
    case SIGN_OUT_SUCCESS:
      return {
        ...currentState,
        currentUser: null,
        error: null,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...currentState,
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
