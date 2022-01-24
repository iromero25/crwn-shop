import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Store } from "../../redux/root-reducer";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { startPaymentProcess } from "../../redux/cart/cart.actions";
import { selectCurrentUser } from "../../redux/user/user.selector";

interface Props extends ConnectedProps<typeof Connector> {
  price: number;
}

const StripeCheckoutButton: React.FC<Props> = ({ price, startPaymentProcess }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51KCqB4JM5mCqSn1CwV3kU5sCFaJS1sA5yxIfS412ad3n7F9P0pJTHfTna0ZapNHPNCZiKHhHYrciUUDpO92NOJWK00CT2LtynJ";

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={(token: Token) => startPaymentProcess(priceForStripe, token)}
      stripeKey={publishableKey}
    />
  );
};

const mapStateToProps = (state: Store) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = {
  startPaymentProcess,
};

const Connector = connect(mapStateToProps, mapDispatchToProps);

export default Connector(StripeCheckoutButton);
