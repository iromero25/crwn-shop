import React, { useState } from "react";

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
}) => {
  const [background, setBackground] = useState<string>("black");

  // the only reasson I add functionality for the `onMouseEnter/Leave` events
  // is to control the  backgroundColor  style of  my button  programatically
  // (instead  of  relying on the css styling).  This is  the only way I know
  // to test that a style is present in the button (see the related test)

  // update: when we add cypress we might be able to revert this  back to  the
  // way it is as cypress should allow us to test the styling in a differently
  // I don't like having to control every single part of the styling like this
  // so it can be tested
  return (
    <button
      onMouseEnter={() => setBackground("white")}
      onMouseLeave={() => setBackground("black")}
      style={{
        backgroundColor: `${background}`,
        color: `${background === "black" ? "white" : "black"}`,
      }}
      className={`${inverted ? "inverted" : ""} ${
        isGoogleSignIn ? "google-sign-in" : ""
      } custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
