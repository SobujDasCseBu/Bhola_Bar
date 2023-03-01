import React from "react";

import "../assets/styles/card-header.css";

const CardHeader = ({ title, classNm }) => {
  return (
    <div className={` -z-40 card-header-container ${classNm || ""}`}>
      <h2 className="header-text text-18 font-family">{title}</h2>
    </div>
  );
};

export default CardHeader;
