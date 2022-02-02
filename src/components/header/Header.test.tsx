import Header from "./Header";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";
import { mockCart, mockUser } from "../../utils/mockData";

const mockStore = configureMockStore();

test("All header links are shown", () => {
  const store = mockStore({
    user: mockUser,
    cart: mockCart,
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  const shopLink = screen.getByRole("link", { name: /shop/i });
  expect(shopLink).toBeInTheDocument();
});
