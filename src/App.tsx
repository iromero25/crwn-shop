import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";

import "./App.css";

const App: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/shop" component={Shop} />
    </Switch>
  </>
);

export default App;
