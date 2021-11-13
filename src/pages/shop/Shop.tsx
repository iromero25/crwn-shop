import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import CollectionPage from "../collection/CollectionPage";
import WithSpinner from "../../components/with-spinner/WithSpinner";
import CollectionOverview from "../../components/collection/CollectionOverview";

import { startCollectionFetch } from "../../redux/shop/shop.actions";
import { selectIsFetching } from "../../redux/shop/shop.selector";
import { Store } from "../../redux/root-reducer";

const CollectionPageWithSpinner = WithSpinner(CollectionPage);
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);

type Props = ConnectedProps<typeof Connector> & RouteComponentProps;

const Shop: React.FC<Props> = ({ match, startCollectionFetch, isFetching }) => {
  useEffect(() => {
    startCollectionFetch();
  }, []);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={props => (
          <CollectionOverviewWithSpinner isLoading={isFetching} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:categoryId`}
        render={props => <CollectionPageWithSpinner isLoading={isFetching} {...props} />}
      />
    </div>
  );
};

const mapStateToProps = (state: Store) => ({
  isFetching: selectIsFetching(state),
});

const mapDispatchToProps = {
  startCollectionFetch,
};

const Connector = connect(mapStateToProps, mapDispatchToProps);

export default Connector(Shop);
