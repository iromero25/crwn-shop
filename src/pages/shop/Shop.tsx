import React, { useState } from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/collection/CollectionPreview";
import { IShopData } from "../../components/types";

const Shop: React.FC = () => {
  const [collections] = useState<IShopData[]>(SHOP_DATA);

  return (
    <div className="shop-page">
      {collections.map(({ id, ...restOfProps }) => (
        <CollectionPreview key={id} {...restOfProps} />
      ))}
    </div>
  );
};

export default Shop;
