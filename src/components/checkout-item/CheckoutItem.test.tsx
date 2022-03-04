import { ToastContainer } from "react-toastify";
import { fireEvent, screen } from "@testing-library/dom";

import CheckoutItem from "./CheckoutItem";
import { mockCart, mockUser } from "../../utils/mockData";
import { renderWithState } from "../../testUtils/renderWithState";

// `updateDBCart` needs to throw an error: we simulate an error when updating the DB
// this is the whole reasom this test exists
jest.mock("../../firebase/firebase.utils", () => ({
  getCurrentUser: () => Promise.resolve({ getIdToken: () => {} }),
  updateDBCart: () => Promise.reject("dummy error"),
}));

// by mocking the `updateCartFromDB` action I make sure no to trigger the ensuing
// logic that deals with fetching from the DB and try to update the Redux Store
jest.mock("../../redux/cart/cart.actions", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("../../redux/cart/cart.actions");
  return {
    __esModule: true, // Use it when dealing with esModules
    ...originalModule,
    // actions that do nothing:
    updateCartFromDB: () => ({ type: "UNDEFINED_ACTION_TYPE" }),
    fetchCartFromDB: () => ({ type: "UNDEFINED_ACTION_TYPE" }),
  };
});

const {
  cartItems: [cartItem],
} = mockCart;

describe("Checkout Item", () => {
  beforeEach(() => {
    const initialstate = {
      user: mockUser,
      cart: mockCart,
    };

    // this is  clever: I need to RENDER the ToastContainer along with the  tested
    // component so that when an error occurs, there's a place to render the toast.
    // Also, by doing this, I don't need to render the <App /> component
    renderWithState(
      <>
        <CheckoutItem cartItem={cartItem} />
        <ToastContainer hideProgressBar />
      </>,
      initialstate
    );
  });

  test("Toast is shown when to updating quantity ends up in DB write fail", async () => {
    // this is an alternative to mock a particular method from a whole module
    // while keeping the rest of the functions in the module intact:

    // jest.spyOn(cartActions, "updateCartFromDB").mockImplementation(() => {
    //   console.log("inside mocked updateCartFromDB");
    //   return {
    //     type: "UNDEFINED_ACTION_TYPE",
    //   } as unknown as cartActions.IUpdateCartFromDB;
    // });

    expect(screen.getByText(cartItem.name)).toBeInTheDocument();
    const increaseButton = screen.getByText("❯");
    fireEvent.click(increaseButton);

    const errorToast = await screen.findByText(
      /error trying to modify the shopping cart/i
    );
    expect(errorToast).toBeInTheDocument();
  });
});
