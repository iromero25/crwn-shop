import React from "react";
import CustomButton from "../custom-button/CustomButton";
import CartItem from "../cart-item/CartItem";
import { Store } from "../../redux/root-reducer";
import { connect, ConnectedProps } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";

import "./cart-dropdown.scss";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

interface ReduxProps extends ConnectedProps<typeof Connector> {}

type Props = ReduxProps & RouteComponentProps;

const CartDropdown: React.FC<Props> = ({ cartItems, hideDropdown, history }) => {
  console.log("CartDropdown is being re-rendered because cart items changed");
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
          hideDropdown();
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStateToProps = ({ cart }: Store) => ({
  cartItems: cart.cartItems,
});

const mapDispatchToProps = {
  hideDropdown: toggleCartHidden,
};

const Connector = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(Connector(CartDropdown));
