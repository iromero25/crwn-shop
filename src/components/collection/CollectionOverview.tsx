import React from "react";
import { Collection } from "../types";
import CollectionPreview from "./CollectionPreview";

import "./collection-overview.scss";

interface Props {
  collections: Collection;
}

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

export default CollectionOverview;
