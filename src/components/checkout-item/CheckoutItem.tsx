import React from "react";
import { IItem } from "../types";
import { connect, ConnectedProps } from "react-redux";
import {
  addCartItem,
  clearItemFromCart,
  decreaseItemQty,
} from "../../redux/cart/cart.actions";

import "./checkout-item.scss";

interface ReduxProps extends ConnectedProps<typeof Connector> {}

interface OwnProps {
  cartItem: IItem;
}

type Props = OwnProps & ReduxProps;

const CheckoutItem: React.FC<Props> = ({
  cartItem,
  increaseCartItem,
  decreaseCartItem,
  removeItem,
}) => {
  const { imageUrl, name, quantity, price } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img alt="item" src={imageUrl} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decreaseCartItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => increaseCartItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={() => removeItem(cartItem)}>
        &#10005;
      </span>
    </div>
  );
};

const mapDispatchToProps = {
  increaseCartItem: (item: IItem) => addCartItem(item),
  decreaseCartItem: (item: IItem) => decreaseItemQty(item),
  removeItem: (item: IItem) => clearItemFromCart(item),
};

const Connector = connect(null, mapDispatchToProps);

export default Connector(CheckoutItem);
