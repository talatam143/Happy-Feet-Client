import React from "react";
import { ToggleWishListIcon } from "../SVG/svgrepo";
import "./EachProduct.css";

function EachProduct(props) {
  const { data } = props;
  return (
    <div className="eachProductContainer">
      <img
        src={`${process.env.REACT_APP_SERVER_URL}${data.files[0].filePath}`}
        alt="product"
        className="eachProductImage"
      />
      <div className="eachProductBrandWhishListContainer">
        <p className="eachProductDarkPara">{data.brand_details.name}</p>
        <ToggleWishListIcon color="#33272a" />
      </div>
      <p className="eachProductLightPara">{data.name}</p>
      <p className="eachProductDarkPara">Rs. {data.price}</p>
    </div>
  );
}

export default EachProduct;
