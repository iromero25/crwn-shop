import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { Store } from "../../redux/root-reducer";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import "./cart-icon.scss";

interface ReduxProps extends ConnectedProps<typeof Connector> {}

const CartIcon: React.FC<ReduxProps> = ({ itemCount, toggleCartHidden }) => {
  console.log(" I am being invoked");
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  // this is just an example on how  to use selectors: one of the
  // main benefits is that they memoize the function  but in this
  // case is futile as this returns a primitive (number) amd thus,
  // the state will always be considered to be changed
  itemCount: selectCartItemsCount(state),
});

const mapDispatchToProps = {
  toggleCartHidden: () => toggleCartHidden(),
};

const Connector = connect(mapStateToProps, mapDispatchToProps);

export default Connector(CartIcon);
