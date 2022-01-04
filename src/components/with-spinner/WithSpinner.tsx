import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

interface ILoading {
  isLoading: boolean;
  widthAndHeigth?: number;
  widthOverlay?: number;
}

const WithSpinner =
  <T extends object>(WrappedComponent: React.FC<T>): React.FC<T & ILoading> =>
  props => {
    const { isLoading, widthAndHeigth, widthOverlay, ...rest } = props;
    return isLoading ? (
      <SpinnerOverlay widthOverlay={widthOverlay}>
        <SpinnerContainer widthAndHeight={widthAndHeigth} />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...(rest as T)} />
    );
  };

export default WithSpinner;
