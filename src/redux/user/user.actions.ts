import { Action } from "redux";
import {
  CurrentUser,
  Error,
  IEmailAndPassword,
  ICredentials,
  ICurrentUser,
} from "../../components/types";
import * as Types from "./user.types";

export const checkUserSession = () => ({
  type: Types.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: Types.SIGN_OUT_START,
});

export interface ISignOutSuccess extends Action<typeof Types.SIGN_OUT_SUCCESS> {}

export const signOutSuccess = (): ISignOutSuccess => ({
  type: Types.SIGN_OUT_SUCCESS,
});

export interface ISignOutFailure extends Action<typeof Types.SIGN_OUT_FAILURE> {
  payload: string;
}

export const signOutFailure = (error: string): ISignOutFailure => ({
  type: Types.SIGN_OUT_FAILURE,
  payload: error,
});

export interface IStartEmailSignInAction
  extends Action<typeof Types.START_EMAIL_SIGN_IN> {
  payload: IEmailAndPassword;
}

export const startEmailSignIn = (
  emailAndPassword: IEmailAndPassword
): IStartEmailSignInAction => ({
  type: Types.START_EMAIL_SIGN_IN,
  payload: emailAndPassword,
});

export const startGoogleSignIn = () => ({
  type: Types.START_GOOGLE_SIGN_IN,
});

export interface ISignInSuccess extends Action<typeof Types.SIGN_IN_SUCCESS> {
  payload: ICurrentUser;
}

export const signInSuccess = (user: CurrentUser): ISignInSuccess => ({
  type: Types.SIGN_IN_SUCCESS,
  payload: user as ICurrentUser,
});

export interface IUserIsAuthenticated extends Action<typeof Types.USER_AUTHENTICATED> {
  payload: ICurrentUser;
}

export const userIsAuthenticated = (user: CurrentUser): IUserIsAuthenticated => ({
  type: Types.USER_AUTHENTICATED,
  payload: user as ICurrentUser,
});

export interface ISignInFailed extends Action<typeof Types.SIGN_IN_FAILURE> {
  payload: Error;
}

export const signInFailed = (error: Error): ISignInFailed => ({
  type: Types.SIGN_IN_FAILURE,
  payload: error,
});

export interface ISignUpStartAction extends Action<typeof Types.SIGN_UP_START> {
  payload: ICredentials;
}

export const signUpStart = (credentials: ICredentials): ISignUpStartAction => ({
  type: Types.SIGN_UP_START,
  payload: credentials,
});

export interface ISignUpFailureAction extends Action<typeof Types.SIGN_UP_FAILURE> {
  payload: string;
}

export const signUpFailure = (error: string) => ({
  type: Types.SIGN_UP_FAILURE,
  payload: error,
});
