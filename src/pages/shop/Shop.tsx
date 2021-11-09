import React, { useState, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import CollectionPage from "../collection/CollectionPage";
import CollectionOverview from "../../components/collection/CollectionOverview";

import { Collection } from "../../components/types";
import { addCollection } from "../../redux/shop/shop.actions";
import { convertCollectionSnapshotToMap, firestore } from "../../firebase/firebase.utils";

type Props = ConnectedProps<typeof Connector> & RouteComponentProps;

const Shop: React.FC<Props> = ({ match, addCollections }) => {
  const [collections, setCollections] = useState<Collection>();

  useEffect(() => {
    const collectionRef = firestore.collection("collections");

    const unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
      const collection = convertCollectionSnapshotToMap(snapshot);
      console.log(collection);
      addCollections(collection);
      setCollections(collection);
    });

    return () => unsubscribeFromSnapshot();
  }, []);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={() =>
          collections ? <CollectionOverview collections={collections} /> : null
        }
      />
      <Route
        path={`${match.path}/:categoryId`}
        render={() => (collections ? <CollectionPage collections={collections} /> : null)}
      />
    </div>
  );
};

const mapDispatchToProps = {
  addCollections: (collection: Collection) => addCollection(collection),
};

const Connector = connect(null, mapDispatchToProps);

export default Connector(Shop);
