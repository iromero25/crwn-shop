import React, { useState } from "react";
import MenuItem from "../menu-item/MenuItem";
import { sections as directoryData, IDirectoryData } from "./directory.data";

import "./directory.scss";

const Directory: React.FC = () => {
  const [sections] = useState<IDirectoryData[]>(directoryData);
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...restOfProps }) => (
        <MenuItem key={id} {...restOfProps} />
      ))}
    </div>
  );
};

export default Directory;
