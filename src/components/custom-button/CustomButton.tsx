import React from "react";

import "./custom-button.scss";

interface Props {
  children: React.ReactNode;
  type: "submit";
}

const CustomButton: React.FunctionComponent<Props> = ({ children, ...otherProps }) => (
  <button className="custom-button" {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
