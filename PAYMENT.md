## Handling the Payment

When the user is decided to pay for the items in his/her shopping cart, the following logic takes place:

1. The whole user's cart item is moved to the cart history: a transaction is created to identify the cart and the time at wich transaction takes place is also stored in the database.
2. The STRIPE payment transaction is executed. This transaction is done in this application's [back-end](./server.js) as the secret key required to execute this transaction cannot be handled by the front-end (for security reasons) and thus, an [API](./src/api/api.ts) is made available for the front-end.
3. As of right now, the payment logic process is handled by [this saga](./src/redux/cart/cart.payment.saga.ts). Comments elaborating on how errors are handled can be found in there.

It is worth mentioning that the content of the cart history is never made available to the user. This is only kept in the database for reference (or future usage) and thus, it is never stored in the Application's state.

## Error handling for payment transactions

It should be noted that proper handle of errors that may occur during the payment process require a more complex logic and probably more resources. In my case, I decided to handle errors in a manner that would allow me experiment and try to understand more about the underlying behaviour (and coding) af redux-sagas.

To begin with, we need to understand that the payment process can fail due to two main reasons:

1. Storing the cart items as history as a consequence of the whole payment process can fail: the DB might not successfully write those items due to a number of reasons; and,
2. The STRIPE payment transaction can also fail

Basically, a fail in either of those two stages requires rolling back the transactions and noticing the user with error messages in the UI.

Since there is a saga handling the whole payment process, the saga is in charge of executing the following contingencies in case of an error in either of the two steps detailed above:

1. If writing the cart items in the DB fails, an error is displayed in the UI and the STRIPE payment is not executed. The app's redux store is not modified.
2. If the STRIPE payment fails, then the items just written into the DB's history are removed and replaced into the current items (all these at the DB level). The redux-store is alos updated to reflect these changes and thus, the items are back in the shopping cart. In short, we attempt a whole rollback of the DB and Redux operations described in point #1 above. Errors are also shown to the user at the UI.

The big inconvenience is that there might be a problem _writing back_ the items in the DB from the _history_ to the _current_ items section. In that case, the whole cart is lost for the user at the UI, but at least it is not lost in the DB and also, no payment is done, which is the most important issue for the user.
