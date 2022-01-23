import { Token } from "react-stripe-checkout";
import CustomError, { STRIPE_PAYMENT_ERROR } from "../utils/CustomError";

export const paymentApi = (
  priceForStripe: number,
  stripeToken: Token,
  onSuccess?: <T>() => T
) =>
  fetch("/payment", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: priceForStripe,
      token: stripeToken,
    }),
  })
    .then(_response => {
      if (onSuccess) onSuccess();
      // throw new Error();
    })
    .catch(() => {
      throw new CustomError(
        "There was an issue with your payment. Please make sure you use the provided credit card.",
        STRIPE_PAYMENT_ERROR
      );
    });
