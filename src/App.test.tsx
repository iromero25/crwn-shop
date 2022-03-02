import { BrowserRouter } from "react-router-dom";
import { screen, fireEvent } from "@testing-library/react";

import App from "./App";
import collection from "./pages/shop/collection.data";
import { renderWithState } from "./testUtils/renderWithState";
import {
  currentCartDummy as mockCart,
  mockCurrentUser,
  mockUser,
} from "./utils/mockData";

jest.mock("./api/api", () => ({
  getUserApi: () => Promise.resolve(mockCurrentUser),
}));

// these functions from the firebase utils are invoked by the sagas tested
// hereby, therefore, tehy need to be mocked:
jest.mock("./firebase/firebase.utils", () => ({
  getCurrentUser: () => Promise.resolve({ getIdToken: () => {} }),
  getCartItemsCollection: () => Promise.resolve({ currentCart: mockCart }),
}));

describe("App is rendered", () => {
  beforeEach(() => {
    const initialState = {
      user: mockUser,
      shop: {
        collection,
        error: "",
        isFetching: false,
      },
    };

    // App is rendered: the check for the user session is triggered there
    renderWithState(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      initialState
    );
  });

  // For  those  cases where the user has logged and the app is reloaded.
  // I expect the cart icon at the header component to display the number
  // of items
  test("logged user's cart item is loaded", async () => {
    // I have two different items in mockCart but total quantity is 3.
    // This quantity is the one displayed in the Cart Icon in the Header
    const totalCartItems = await screen.findByText("3");
    expect(totalCartItems).toBeInTheDocument();
  });

  // A more aislated, contained way to test this is done in Shop.test.tsx:
  test("Shop route renders items", async () => {
    const shopLink = screen.getByRole("link", { name: /shop/i });
    expect(shopLink).toBeInTheDocument();
    fireEvent.click(shopLink);

    // I expect 20 items to be shown in total because I have 5 collections
    // and the shop page should only display 4 items by collecion
    const itemsArray = await screen.findAllByRole("img");
    expect(itemsArray).toHaveLength(20);

    // find the first item in the hats collection by name
    const firstCollectionItem = await screen.findByText(
      collection.hats?.items[0].name ?? ""
    );
    expect(firstCollectionItem).toBeInTheDocument();
  });
});
