import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { connect, ConnectedProps } from "react-redux";
import { Store } from "../../redux/root-reducer";
import CartIcon from "../cart-icon/CartIcon";
import CartDropdown from "../cart-dropdown/CartDropdown";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectIsCartHidden } from "../../redux/cart/cart.selectors";
import { signOutStart } from "../../redux/user/user.actions";

import "./header.scss";
import WithSpinner from "../with-spinner/WithSpinner";

const CartIconWithSpinner = WithSpinner(CartIcon);

interface ReduxProps extends ConnectedProps<typeof Connector> {}

const Header: React.FC<ReduxProps> = ({
  currentUser,
  isCartHidden,
  isShoppingCartFetching,
  checkingUserSession,
  signOutStart,
}) => (
  <div className="header">
    <Link to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={signOutStart}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIconWithSpinner
        isLoading={checkingUserSession || isShoppingCartFetching}
        widthOverlay={9}
        widthAndHeigth={18}
      />
    </div>
    {isCartHidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = (state: Store) => ({
  checkingUserSession: state.user.checkingUserSession,
  currentUser: selectCurrentUser(state),
  isCartHidden: selectIsCartHidden(state),
  isShoppingCartFetching: state.cart.isFetching,
});

const mapDispatchToProps = {
  signOutStart,
};

const Connector = connect(mapStateToProps, mapDispatchToProps);

export default Connector(Header);
