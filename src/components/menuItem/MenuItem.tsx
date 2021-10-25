import React from "react";
import { IDirectoryData } from "../directory/directory.data";

import "./menu-item.scss";

interface Props extends Omit<IDirectoryData, "id"> {}

const MenuItem: React.FC<Props> = ({ imageUrl, size, title }) => (
  <div className={`${size} menu-item`}>
    <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default MenuItem;
