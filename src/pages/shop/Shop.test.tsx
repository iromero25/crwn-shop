import { screen } from "@testing-library/react";
import { BrowserRouter, Route, MemoryRouter } from "react-router-dom";

import Shop from "./Shop";
import { keys } from "../../utils/utils";
import collection from "./collection.data";
import { renderWithState } from "../../testUtils/renderWithState";

jest.mock("../../firebase/firebase.utils", () => jest.fn());

describe("Shop component", () => {
  beforeEach(() => {
    const initialState = {
      shop: {
        collection,
        error: "",
        isFetching: false,
      },
    };

    renderWithState(
      <BrowserRouter>
        <MemoryRouter initialEntries={["/shop"]}>
          <Route path="/shop" render={props => <Shop {...props} />}></Route>
        </MemoryRouter>
      </BrowserRouter>,
      initialState
    );
  });

  test("displays items for each collection in store", async () => {
    const titlesToShow = keys(collection).map(
      collectionKey => collection[collectionKey].title
    );
    const allCollectionTitles = await screen.findAllByText(
      /hats|jackets|sneakers|womens|mens/i
    );
    expect(allCollectionTitles).toHaveLength(5);
  });

  // this test aims to make sure the 4th item (for the Hats collection)
  // is in the document while the 5th is not
  test("only the first four items of each collection are shown", async () => {
    const hatItems = collection.hats.items;
    const fourthHatItem = await screen.findByText(hatItems[3].name);
    const fifthHatItem = screen.queryByText(hatItems[4].name);

    expect(fourthHatItem).toBeInTheDocument();
    expect(fifthHatItem).not.toBeInTheDocument();
  });
});
