import React from "react";
import CollectionItem from "./CollectionItem";
import { IShopData } from "../types";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./collection-preview.scss";

interface Props extends IShopData, RouteComponentProps {}

/**
 * This is the component showing the first 4 elements of each collection.
 * i.e.: The content at the Shop page
 */
const CollectionPreview: React.FC<Props> = ({
  title,
  items,
  history,
  match,
  routeName,
}) => (
  <div className="collection-preview">
    <h1 className="title" onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title}
    </h1>
    <div className="preview">
      {items
        .filter((item, index) => index < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default withRouter(CollectionPreview);
