import { screen } from "@testing-library/react";
import { BrowserRouter, Route, MemoryRouter } from "react-router-dom";

import CollectionPage from "./CollectionPage";
import collection from "../shop/collection.data";
import { renderWithState } from "../../testUtils/renderWithState";

jest.mock("../../firebase/firebase.utils", () => jest.fn());

describe("Collection Page for Hats", () => {
  test("displays the expected items and title", async () => {
    const initialState = {
      shop: {
        collection,
        error: "",
        isFetching: false,
      },
    };

    // This is good example  on how to test a component (CollectionPage in this
    // case) that relies on information passed on/managed by the BrowserRouter.

    // MemoryRouter is recommended by the docs to be used on tests  to "mock"  a
    // route (/shops/hats in this case). I have to use the Route  component 'cos
    // that specifies the param (categoryId) that is passed on to CollectionPage
    // which is required by that component to work as expected
    renderWithState(
      <BrowserRouter>
        <MemoryRouter initialEntries={["/shop/hats"]}>
          <Route path="/shop/:categoryId" render={_props => <CollectionPage />}></Route>
        </MemoryRouter>
      </BrowserRouter>,
      initialState
    );

    // find the first item in the collection by name
    const { hats } = collection;
    const firstItemName = hats?.items[0].name ?? "";
    const firstItemInCollection = await screen.findByText(firstItemName);
    const itemsArray = await screen.findAllByRole("img");
    const title = await screen.getByText(hats?.title ?? "");

    expect(firstItemInCollection).toBeVisible();
    expect(itemsArray).toHaveLength(hats.items.length);
    expect(title).toBeVisible();
  });
});
