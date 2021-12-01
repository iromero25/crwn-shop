import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";
import HomePage from "./pages/homepage/HomePage";
import CheckoutPage from "./pages/checkout/Checkout";
import SignInAndSignOut from "./pages/sign/SignInAndSingOut";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

import "./App.css";

const App: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
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

export default App;
