import React from "react";
import firebase from "firebase/compat";

import "./custom-button.scss";

interface Props {
  children: React.ReactNode;
  onClick?: () => Promise<firebase.auth.UserCredential>;
  type?: "submit";
  isGoogleSignIn?: boolean;
}

const CustomButton: React.FunctionComponent<Props> = ({
  children,
  isGoogleSignIn,
  ...otherProps
}) => (
  <button
    className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
