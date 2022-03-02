import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import { mockUser } from "../../utils/mockData";
import { renderWithState } from "../../testUtils/renderWithState";

// mock the whole firebase utils as an empty function
// (as I don't need to test writes to the DB!!)
jest.mock("../../firebase/firebase.utils", () => jest.fn());

test("All header links are shown", () => {
  const initialState = {
    user: mockUser,
  };

  renderWithState(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
    initialState
  );

  const shopLink = screen.getByRole("link", { name: /shop/i });
  expect(shopLink).toBeInTheDocument();
});
