import React from "react";
import { Store } from "../../redux/root-reducer";
import CollectionPreview from "./CollectionPreview";
import { connect, ConnectedProps } from "react-redux";

import "./collection-overview.scss";
import { selectCollections } from "../../redux/shop/shop.selector";

interface Props extends ConnectedProps<typeof Connector> {}

/**
 * This is the component showing all the shop items for a specific
 * category. (i.e.: all hats, all jackets, etc)
 */
const CollectionOverview: React.FC<Props> = ({ collections }) => (
  <div className="collections-overview">
    {Object.values(collections).map(collectionItem => (
      <CollectionPreview key={collectionItem.id} {...collectionItem} />
    ))}
  </div>
);

const mapStateToProps = (state: Store) => ({
  collections: selectCollections(state),
});

const Connector = connect(mapStateToProps);

export default Connector(CollectionOverview);
