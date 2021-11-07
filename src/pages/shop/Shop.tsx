import React, { useState } from "react";
import { Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import { Collection } from "../../components/types";
import CollectionPage from "../collection/CollectionPage";
import COLLECTION_DATA from "./collection.data";
import CollectionOverview from "../../components/collection/CollectionOverview";

const Shop: React.FC<RouteComponentProps> = ({ match }) => {
  const [collections] = useState<Collection>(COLLECTION_DATA);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={() => <CollectionOverview collections={collections} />}
      />
      <Route
        path={`${match.path}/:categoryId`}
        render={() => <CollectionPage collections={collections} />}
      />
    </div>
  );
};

export default Shop;
