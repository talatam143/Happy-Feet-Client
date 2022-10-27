import React from "react";
import { Link } from "react-router-dom";

function Brand(props) {
  const { details } = props;

  return (
    <div className="eachBrandContainer">
    <Link className="globalLinks" to={`/products?brand=${details.name.replace("&", "%40")}`}>
      <img
        src={`${process.env.REACT_APP_SERVER_URL}${details.image.filePath}`}
        alt="category-logo"
        className="eachBrandImage"
      />
      <p className="eachBrandPara">{details.name}</p>
      </Link>
    </div>
  );
}

export default Brand;
