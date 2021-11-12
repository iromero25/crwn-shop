import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import CollectionItem from "../../components/collection/CollectionItem";
import { Collection, IShopData } from "../../components/types";
import { Store } from "../../redux/root-reducer";

import "./collection.scss";

// it is better to specify categoryId as string because from the perspective
// of react-router, this URL parameter us a string, not a key of Collection
export interface IRouteParams {
  categoryId: string;
}

interface Props
  extends RouteComponentProps<IRouteParams>,
    ConnectedProps<typeof Connector> {

const CollectionPage: React.FC<Props> = ({ match, collections }) => {
  const { categoryId } = match.params;
  const { title, items } = collections[categoryId as keyof Collection]; // he cast the category heres

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

const mapStateToProps = ({ collections }: Store) => ({
  collections,
});

const Connector = connect(mapStateToProps);

export default Connector(CollectionPage);
