import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

interface ILoading {
  isLoading: boolean;
}

const WithSpinner =
  <T extends object>(WrappedComponent: React.FC<T>): React.FC<T & ILoading> =>
  props => {
    const { isLoading, ...rest } = props;
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...(rest as T)} />
    );
  };

export default WithSpinner;
