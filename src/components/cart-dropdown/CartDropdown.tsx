import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../cart-item/CartItem";
import { Store } from "../../redux/root-reducer";
import CustomButton from "../custom-button/CustomButton";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.scss";

const CartDropdown: React.FC = () => {
  console.log("CartDropdown is being re-rendered because cart items changed");
  const cartItems = useSelector((state: Store) => state.cart.cartItems);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} item={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

export default CartDropdown;
