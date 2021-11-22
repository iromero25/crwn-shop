import React from "react";

import firebase from "firebase/compat";

import "./custom-button.scss";
import { Action } from "redux";

interface Props {
  children: React.ReactNode;
  type?: "submit" | "button";
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  onClick?: () => Action | Promise<firebase.auth.UserCredential> | void;
}

const CustomButton: React.FunctionComponent<Props> = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? "inverted" : ""} ${
      isGoogleSignIn ? "google-sign-in" : ""
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
