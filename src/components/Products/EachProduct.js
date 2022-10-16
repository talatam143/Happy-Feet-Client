import React from "react";
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
      <p className="eachProductDarkPara">{data.brand_details.name}</p>
      <p className="eachProductLightPara">{data.name}</p>
      <p className="eachProductDarkPara">Rs. {data.price}</p>
    </div>
  );
}

export default EachProduct;
