import { Action } from "redux";
import { CurrentUser, Error, IEmailAndPassword } from "../../components/types";
import * as Types from "./types";

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
  payload: CurrentUser;
}

export const signInSuccess = (user: CurrentUser): ISignInSuccess => ({
  type: Types.SIGN_IN_SUCCESS,
  payload: user,
});

export interface ISignInFailed extends Action<typeof Types.SIGN_IN_FAILURE> {
  payload: Error;
}

export const signInFailed = (error: Error): ISignInFailed => ({
  type: Types.SIGN_IN_FAILURE,
  payload: error,
});
