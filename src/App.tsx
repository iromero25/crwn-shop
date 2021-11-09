import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/homepage/HomePage";
import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";
import SignInAndSignOut from "./pages/sign/SignInAndSingOut";
import CheckoutPage from "./pages/checkout/Checkout";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { CurrentUser } from "./components/types";
import { setCurrentUser } from "./redux/user/user.actions";
import { Store } from "./redux/root-reducer";

import "./App.css";

interface ReduxProps extends ConnectedProps<typeof Connector> {}

const App: React.FC<ReduxProps> = ({ currentUser, setCurrentUser }) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        if (userRef) {
          userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
            });
          });
        }
      } else {
        setCurrentUser(null);
      }
      // addCollectionAndDocuments("collections", COLLECTION_DATA);
    });

    return () => {
      unsubscribeFromAuth();
    };
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

const mapStateToProps = ({ currentUser }: Store) => ({
  currentUser,
});

const mapDispatchToProps = {
  setCurrentUser: (user: CurrentUser) => setCurrentUser(user),
};

const Connector = connect(mapStateToProps, mapDispatchToProps);

export default Connector(App);
