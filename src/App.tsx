import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";
import SignInAndSignOut from "./pages/sign/SignInAndSingOut";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { CurrentUser } from "./components/types";
import { connect, ConnectedProps } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.css";
import { Store } from "./redux/root-reducer";

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
