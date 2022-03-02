import React from "react";
import CustomButton from "../custom-button/CustomButton";
import { connect, ConnectedProps } from "react-redux";
import { addCartItem } from "../../redux/cart/cart.actions";

import "./collection-item.scss";
import { IItem } from "../types";

interface OwnProps {
  item: IItem;
}

type Props = OwnProps & ConnectedProps<typeof Connector>;

const CollectionItem: React.FC<Props> = ({ addCartItem, item }) => {
  const { name, imageUrl, price } = item;
  return (
    <div className="collection-item">
      <img role="img" className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton inverted onClick={() => addCartItem(item)}>
        Add to Cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = {
  addCartItem: (item: IItem) => addCartItem(item),
};

const Connector = connect(null, mapDispatchToProps);

export default Connector(CollectionItem);
