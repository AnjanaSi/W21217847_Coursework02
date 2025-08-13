import React from "react";

const MainHeader = () => {
  return (
    <header className="header-banner">
      <div className="overlay"></div>
      <div className="animated-texts overlay-content">
        <h1>
          Welcome to <span className="hotel-color">Digital Library</span>
        </h1>
      </div>
    </header>
  );
};

export default MainHeader;