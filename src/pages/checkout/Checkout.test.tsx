import { fireEvent, screen } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";

import Checkout from "./Checkout";
import { mockCart, mockUser } from "../../utils/mockData";
import { renderWithState } from "../../testUtils/renderWithState";

jest.mock("../../firebase/firebase.utils", () => ({
  getCurrentUser: () => Promise.resolve({ getIdToken: () => {} }),
  getCartItemsCollection: () => Promise.resolve({ currentCart: mockCart }),
  updateDBCart: () => Promise.resolve({}),
}));

describe("Checkout -> Checkout Item", () => {
  // Important: to test modifying quantities for a  CheckoutItem, I need
  // to test the whole Checkout component: CheckoutItem is not connected
  // to Redux's store, therefore modifying a quantity doesn't re-renders
  // the component
  beforeEach(() => {
    const initialstate = {
      user: mockUser,
      cart: mockCart,
    };

    renderWithState(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>,
      initialstate
    );
  });

  const {
    cartItems: [cartItem],
  } = mockCart;
  const itemQuantity = cartItem.quantity ?? 1;

  test("quantity is displayed and modified with arrows un UI", async () => {
    expect(screen.getByText(cartItem.name)).toBeVisible();
    expect(screen.getByText(itemQuantity)).toBeVisible();
    expect(screen.getByText(cartItem.price)).toBeVisible();

    const incrementArrow = screen.getByText("❯");
    expect(incrementArrow).toBeVisible();
    fireEvent.click(incrementArrow);
    expect(await screen.findByText(itemQuantity + 1)).toBeInTheDocument();
  });

  test("right item quantity is displayed after quick clicks on arrows", async () => {
    expect(itemQuantity).toBe(1); // initial quantity ought to be 1
    const decrementArrow = screen.getByText("❮");
    const incrementArrow = screen.getByText("❯");

    // increment three times, decrement twice = quantity + 1
    fireEvent.click(incrementArrow); // +1
    fireEvent.click(incrementArrow); // +1
    fireEvent.click(incrementArrow); // +1
    fireEvent.click(decrementArrow); // -1
    fireEvent.click(decrementArrow); // -1
    expect(await screen.findByText(itemQuantity + 1)).toBeInTheDocument();

    // decrement to quantity zero, which should remove the item from the DOM
    fireEvent.click(decrementArrow);
    fireEvent.click(decrementArrow);
    expect(screen.queryByText(cartItem.name)).not.toBeInTheDocument();
  });

  test("remove button should work", () => {
    expect(screen.getByText(cartItem.name)).toBeInTheDocument();
    const removeButton = screen.getByText("✕");
    expect(removeButton).toBeVisible();

    fireEvent.click(removeButton);
    expect(screen.queryByText(cartItem.name)).not.toBeInTheDocument();
  });

  test("total is updated on the page on qty changes", async () => {
    const itemPrice = cartItem.price;
    const incrementArrow = screen.getByText("❯");

    expect(itemQuantity).toBe(1); // initial quantity ought to be 1
    expect(screen.getByText(itemPrice * 1));

    fireEvent.click(incrementArrow); // +1
    fireEvent.click(incrementArrow); // +1

    const updatedQuantity = 3;
    const updatedPrice = itemPrice * updatedQuantity;
    const updatedPriceRegExp = new RegExp(updatedPrice.toString());
    expect(await screen.findByText(updatedQuantity));
    expect(await screen.findByText(updatedPriceRegExp));
  });
});
