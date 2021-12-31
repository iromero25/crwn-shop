import React from "react";
import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import { connect, ConnectedProps } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";
import { Store } from "../../redux/root-reducer";

import "./checkout.scss";
import StripeCheckoutButton from "../../components/stripe-button/StripeButton";

interface ReduxProps extends ConnectedProps<typeof Connector> {}

const CheckoutPage: React.FC<ReduxProps> = ({ cartItems, cartTotal }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">
      <span>Total: ${cartTotal}</span>
    </div>
    <div className="test-warning">
      *Please use the followiing test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/23 - CVV: 123
    </div>
    <StripeCheckoutButton price={cartTotal} />
  </div>
);

const mapSateToProps = (state: Store) => ({
  cartItems: selectCartItems(state),
  cartTotal: selectCartTotal(state),
});

const Connector = connect(mapSateToProps);

export default Connector(CheckoutPage);
