import React from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { IDirectoryData } from "../directory/directory.data";

import "./menu-item.scss";

interface RoutedProps extends RouteComponentProps, Omit<IDirectoryData, "id"> {}

const MenuItem: React.FC<RoutedProps> = ({
  imageUrl,
  size,
  title,
  linkUrl,
  history,
  match,
}) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
