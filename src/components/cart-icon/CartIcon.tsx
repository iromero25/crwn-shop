import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import toggleCartHidden from "../../redux/cart/cart.actions";

import "./cart-icon.scss";

interface ReduxProps extends ConnectedProps<typeof Connector> {}

const CartIcon: React.FC<ReduxProps> = ({ toggleCartHidden }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">0</span>
  </div>
);

const mapDispatchToProps = {
  toggleCartHidden: () => toggleCartHidden(),
};

const Connector = connect(null, mapDispatchToProps);

export default Connector(CartIcon);
