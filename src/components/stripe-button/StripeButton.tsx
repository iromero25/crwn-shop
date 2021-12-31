import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";

interface Props {
  price: number;
}

const StripeCheckoutButton: React.FC<Props> = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51KCqB4JM5mCqSn1CwV3kU5sCFaJS1sA5yxIfS412ad3n7F9P0pJTHfTna0ZapNHPNCZiKHhHYrciUUDpO92NOJWK00CT2LtynJ";

  const onToken = (token: Token) => {
    console.log(token);
    alert("Payment successful");
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

export default StripeCheckoutButton;
