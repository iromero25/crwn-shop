## Handling the storage of items in this app

When attempting to store an item into the shopping cart, the following logic is applied:

1. We save the cart items into the DB only if the user is logged-in
2. If a Guest user (a non-logged user) attempts to add items, they are added to the store (Redux) and added to the existing shopping cart when the user successfully signs in
3. I use a `cartItems` collection in firebase to store the current shopping cart
4. The userId is used as the key of the object storing the current (and possible past) shopping carts, attempted structure follows:

```
cartItem: {
  userId: {
    currentItems: [{ ...cartItem }]
    history: [{ closedAt, items: []}]
  }
}
```

5. An item is first added to the Store (Redux) and then it is asynchronously stored in the DB (this helps improving user experience)
6. Once the user pays, the current cart item is moved to the user's cart item history and the current cart is cleared
