import React from "react";

import "./homepage.scss";

const HomePage: React.FC = () => (
  <div className="homepage">
    <div className="directory-menu">
      <div className="menu-item">
        <div className="content">
          <div className="title">
            <div className="subtitle">HATS</div>
          </div>
        </div>
      </div>
      <div className="menu-item">
        <div className="content">
          <div className="title">
            <div className="subtitle">JACKETS</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
