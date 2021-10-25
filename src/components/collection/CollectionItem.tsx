import React from "react";
import { IItem } from "../../pages/shop/shop.data";

import "./collection-item.scss";

interface Props extends Omit<IItem, "id"> {}

const CollectionItem: React.FC<Props> = ({ name, imageUrl, price }) => (
  <div className="collection-item">
    <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
    <div className="collection-footer">
      <span className="name">{name}</span>
      <span className="price">{price}</span>
    </div>
  </div>
);

export default CollectionItem;
