import { Action } from "redux";
import { CurrentUser } from "../../components/types";
import { SET_CURRENT_USER } from "./types";

export interface ISetCurrentUserAction extends Action<typeof SET_CURRENT_USER> {
  payload: CurrentUser;
}

export const setCurrentUser = (user: CurrentUser): ISetCurrentUserAction => ({
  type: SET_CURRENT_USER,
  payload: user,
});
