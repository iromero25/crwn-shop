import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { CollectionKeys } from "../../components/types";
import { selectCollection } from "../../redux/shop/shop.selector";
import CollectionItem from "../../components/collection/CollectionItem";

import "./collection.scss";

// it is better to specify categoryId as string because from the perspective
// of react-router, this URL parameter us a string, not a key of Collection
export interface IRouteParams {
  categoryId: CollectionKeys;
}

const CollectionPage: React.FC = () => {
  const { categoryId } = useParams<IRouteParams>(); // should it be typed like this?
  const collection = useSelector(selectCollection(categoryId));
  const { title, items } = collection;

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

export default CollectionPage;
