import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import CollectionItem from "../../components/collection/CollectionItem";
import { Collection } from "../../components/types";

import "./collection.scss";

interface IRouteParams {
  categoryId: keyof Collection;
}

interface Props extends RouteComponentProps<IRouteParams> {
  collections: Collection;
}

const CollectionPage: React.FC<Props> = ({ match, collections }) => {
  const { categoryId } = match.params;
  const { title, items } = collections[categoryId];

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default withRouter(CollectionPage);
