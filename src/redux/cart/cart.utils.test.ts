import jest from "jest";
import { currentCartDummy, dummyItem } from "../../utils/mockData";
import { addItemToCart, decreaseItemFromCart } from "./cart.utils";

describe("cart utils", () => {
  test("addItemToCart adds a new cart item to existing shopping cart", () => {
    const resultingCart = addItemToCart([dummyItem], currentCartDummy);
    expect(resultingCart.length).toBe(currentCartDummy.length + 1);
  });

  test("addItemToCart adds an existing item to existing shopping cart", () => {
    const firstItemInShoppingCart = currentCartDummy[0];
    const resultingCart = addItemToCart([firstItemInShoppingCart], currentCartDummy);
    // since we add an existing item, the number of items in the shopping cart remains
    expect(resultingCart.length).toBe(currentCartDummy.length);
    // however, the quantity of the element being added is increased
    expect(resultingCart[0].quantity).toBe((firstItemInShoppingCart?.quantity ?? 0) + 1);
  });

  test("shopping cart parameter is not modified by reference", () => {
    const resultingCart = addItemToCart([dummyItem], currentCartDummy);
    expect(resultingCart.length).toBe(currentCartDummy.length + 1);
    expect(currentCartDummy).not.toBe(resultingCart);
    expect(currentCartDummy.length).not.toBe(resultingCart.length);
  });

  test("decreasing an item with quantity of 1 from the shopping cart removes it", () => {
    const itemWithOneQuantity = currentCartDummy[1];
    expect(itemWithOneQuantity.quantity).toBe(1);
    expect(currentCartDummy.length).toBe(2);
    const resultingitem = decreaseItemFromCart(itemWithOneQuantity, currentCartDummy);
    expect(resultingitem.length).toBe(1);
  });
});
