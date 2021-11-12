import React, { useState, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import CollectionPage from "../collection/CollectionPage";
import WithSpinner from "../../components/with-spinner/WithSpinner";
import CollectionOverview from "../../components/collection/CollectionOverview";

import { Collection } from "../../components/types";
import { addCollection } from "../../redux/shop/shop.actions";
import { convertCollectionSnapshotToMap, firestore } from "../../firebase/firebase.utils";

const CollectionPageWithSpinner = WithSpinner(CollectionPage);
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);

type Props = ConnectedProps<typeof Connector> & RouteComponentProps;

const Shop: React.FC<Props> = ({ match, addCollections }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");

    const unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
      const collection = convertCollectionSnapshotToMap(snapshot);
      addCollections(collection);
      setLoading(false);
    });

    return () => unsubscribeFromSnapshot();
  }, []);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={props => <CollectionOverviewWithSpinner isLoading={loading} {...props} />}
      />
      <Route
        path={`${match.path}/:categoryId`}
        render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />}
      />
    </div>
  );
};

const mapDispatchToProps = {
  addCollections: (collection: Collection) => addCollection(collection),
};

const Connector = connect(null, mapDispatchToProps);

export default Connector(Shop);
