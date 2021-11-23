import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";
import HomePage from "./pages/homepage/HomePage";
import CheckoutPage from "./pages/checkout/Checkout";
import SignInAndSignOut from "./pages/sign/SignInAndSingOut";

import { Store } from "./redux/root-reducer";
import { selectCurrentUser } from "./redux/user/user.selector";

import "./App.css";
import { checkUserSession } from "./redux/user/user.actions";

interface ReduxProps extends ConnectedProps<typeof Connector> {}

const App: React.FC<ReduxProps> = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={Shop} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <SignInAndSignOut />)}
        />
      </Switch>
    </>
  );
};

const mapStateToProps = (state: Store) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = {
  checkUserSession,
};

const Connector = connect(mapStateToProps, mapDispatchToProps);

export default Connector(App);
