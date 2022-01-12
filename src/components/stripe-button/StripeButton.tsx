import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { toast } from "react-toastify";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { moveCartToHistory } from "../../redux/cart/cart.actions";

interface Props extends ConnectedProps<typeof Connector> {
  price: number;
}

const StripeCheckoutButton: React.FC<Props> = ({ price, moveCartToHistory }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51KCqB4JM5mCqSn1CwV3kU5sCFaJS1sA5yxIfS412ad3n7F9P0pJTHfTna0ZapNHPNCZiKHhHYrciUUDpO92NOJWK00CT2LtynJ";

  const onToken = (token: Token) => {
    // maybe this can go to a diferent saga?
    fetch("/payment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: priceForStripe,
        token,
      }),
    })
      .then(() => {
        toast.success("Payment successfull");
        // the payment is successful but we need to send the items to the history
        // what if that transaction fails? should we try to move the items and then execute the payment?
        // Maybe!
        moveCartToHistory();
      })
      .catch(() =>
        toast.error(
          '"There was an issue with your payment. Please make sure you use the provided credit card."'
        )
      );
  };

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
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = {
  moveCartToHistory,
};

const Connector = connect(null, mapDispatchToProps);

export default Connector(StripeCheckoutButton);
