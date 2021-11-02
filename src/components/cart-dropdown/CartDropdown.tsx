import React from "react";
import CustomButton from "../custom-button/CustomButton";
import CartItem from "../cart-item/CartItem";
import { Store } from "../../redux/root-reducer";
import { connect, ConnectedProps } from "react-redux";

import "./cart-dropdown.scss";

interface ReduxProps extends ConnectedProps<typeof Connector> {}

const CartDropdown: React.FC<ReduxProps> = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

// toDo: all actions should return an Action type
const mapStateToProps = ({ cart }: Store) => ({
  cartItems: cart.cartItems,
});

const Connector = connect(mapStateToProps);

export default Connector(CartDropdown);
