import { Token } from "react-stripe-checkout";
import CustomError, { STRIPE_PAYMENT_ERROR } from "../utils/CustomError";

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? ""
    : `https://localhost.com:${process.env.NODE_ENV}`;

export const paymentApi = (
  priceForStripe: number,
  stripeToken: Token,
  onSuccess?: <T>() => T
) =>
  fetch("/payment", {
    method: "post",
    headers: { "Content-Type": "application/json" },
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

export const getUserApi = (token: string) =>
  fetch(`${baseUrl}/getUser`, {
    method: "get",
    credentials: "include",
    headers: { "Content-Type": "application/json", Authorization: token },
  })
    .then(response => (response.ok ? response.json() : new Error(response.statusText)))
    .then(data => data)
    .catch(error => console.log(`/getUser endpoint error: ${error.message} `));

export const createUserApi = (
  token: string,
  displayName: string,
  email: string,
  additionalData?: Record<string, any>
) =>
  fetch("/createUser", {
    method: "post",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({
      displayName,
      email,
      ...additionalData,
    }),
  })
    .then(response => (response.ok ? response.json() : new Error(response.statusText)))
    .then(data => data)
    .catch(error => console.log(`/createUser endpoint error: ${error.message} `));
