import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect, ConnectedProps } from "react-redux";
import { Store } from "../../redux/root-reducer";

import "./header.scss";

interface ReduxProps extends ConnectedProps<typeof Connector> {}

const Header: React.FC<ReduxProps> = ({ currentUser }) => (
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
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

const mapStateToProps = ({ currentUser }: Store) => ({
  currentUser,
});

const Connector = connect(mapStateToProps);

export default Connector(Header);
