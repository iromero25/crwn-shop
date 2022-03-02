import { Provider } from "react-redux";
import rootSaga from "../redux/root-saga";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import rootReducer, { Store } from "../redux/root-reducer";
import { queries, render, RenderResult } from "@testing-library/react";

export const renderWithState = (
  jsxComponent: JSX.Element,
  initialState?: Partial<Store>
): RenderResult<typeof queries, HTMLElement> => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState || {},
    applyMiddleware(...[sagaMiddleware])
  );
  sagaMiddleware.run(rootSaga);

  // const Wrapper = ({ children }: { children: ReactChildren }) => (
  //   <Provider store={store}>{children}</Provider>
  // );

  return render(<Provider store={store}>{jsxComponent}</Provider>);
};
