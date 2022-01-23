export const MODIFY_SHOPPING_CART_ERROR = -1;
export const STRIPE_PAYMENT_ERROR = -2;

export default class CustomError extends Error {
  code: number | undefined;
  name: string;
  message: string;

  constructor(message: string, code?: number, name: string = message) {
    super(message);
    this.code = code;
    this.name = name;
    this.message = message;
  }
  getCode() {
    return this.code;
  }
}
