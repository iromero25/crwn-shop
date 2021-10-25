import React from "react";
import CollectionItem from "./CollectionItem";
import { IShopData } from "../../pages/shop/shop.data";

import "./collection-preview.scss";

interface Props extends Omit<IShopData, "id"> {}

const CollectionPreview: React.FC<Props> = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title}</h1>
    <div className="preview">
      {items
        .filter((item, index) => index < 4)
        .map(({ id, ...restOfProps }) => (
          <CollectionItem key={id} {...restOfProps} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
