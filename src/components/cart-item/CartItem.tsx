import React from "react";
import { IItem } from "../types";

import "./cart-item.scss";

interface Props {
  item: IItem;
}

const CartItem: React.FC<Props> = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className="cart-item">
    <img src={imageUrl} alt="item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

export default CartItem;
