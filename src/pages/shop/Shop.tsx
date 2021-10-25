import React, { useState } from "react";
import CollectionPreview from "../../components/collection/CollectionPreview";
import SHOP_DATA, { IShopData } from "./shop.data";

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
