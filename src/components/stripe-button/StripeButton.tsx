import React from "react";
import { toast } from "react-toastify";
import StripeCheckout, { Token } from "react-stripe-checkout";

interface Props {
  price: number;
}

const StripeCheckoutButton: React.FC<Props> = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51KCqB4JM5mCqSn1CwV3kU5sCFaJS1sA5yxIfS412ad3n7F9P0pJTHfTna0ZapNHPNCZiKHhHYrciUUDpO92NOJWK00CT2LtynJ";

  const onToken = (token: Token) => {
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
      .then(response => {
        toast.success("Payment successfull");
      })
      .catch(error => {
        toast.error(
          '"There was an issue with your payment. Please make sure you use the provided credit card."'
        );
      });
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
