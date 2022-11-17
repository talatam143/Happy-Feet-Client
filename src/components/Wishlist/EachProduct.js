import React, { useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "../SVG/svgrepo";

import { addToCart } from "../../api/CartApi";
import { removeFromWishList } from "../../api/WishListApi";
import "./EachWishList.css";
import { CircularProgress } from "@mui/material";

function EachProduct(props) {
  const { data, fetchWishListProducts, updateSnackBar } = props;
  const navigate = useNavigate();
  const user = useSelector((state) => state.userState);
  const [selectSize, setSelectSize] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleRemoveWishList = async () => {
    const getCookie = Cookies.get("HappyT");
    if (getCookie === undefined) {
      navigate("/login");
    } else {
      const wishlistData = { mobileNumber: user.number, id: data._id };
      const { status, responseData } = await removeFromWishList(wishlistData);
      if (status === 200) {
        fetchWishListProducts();
        updateSnackBar(true, responseData.message);
      }
    }
  };

  const navigateToView = (e) => {
    const tag = e.target.tagName;
    if (
      tag !== "BUTTON" &&
      tag !== "svg" &&
      tag !== "path" &&
      e.target.id !== "sizeParaId"
    ) {
      navigate(`/products/${data._id}`);
    }
  };

  const addToBag = async () => {
    setSelectSize(true);
    if (selectedSize !== null) {
      const getNum = Cookies.get("num");
      let productData = {
        id: data._id,
        quantity: 1,
        size: selectedSize,
        mobileNumber: getNum,
      };
      setLoadingStatus(true);
      const { status, responseData } = await addToCart(productData);
      if (status === 200) {
        fetchWishListProducts();
        updateSnackBar(true, responseData.message);
        setLoadingStatus(false);
      } else {
        updateSnackBar(true, responseData.error);
        setLoadingStatus(false);
      }
    }
  };

  return (
    <div className="eachProductContainer" onClick={navigateToView}>
      <img
        src={`${process.env.REACT_APP_SERVER_URL}${data.files[0].filePath}`}
        alt="product"
        className="eachProductImage"
      />
      {selectSize ? (
        <>
          <p className="selectSizePara">Select Size</p>
          <div className="wishListSelectSizeDiv">
            {data.size_quantity.sort().map(
              (eachSize) =>
                eachSize.quantity > 0 && (
                  <p
                    id="sizeParaId"
                    key={eachSize.size}
                    className={
                      eachSize.size === selectedSize
                        ? "eachSelectedWishListSizePara"
                        : "eachWishListSizePara"
                    }
                    onClick={() => {
                      setSelectedSize(eachSize.size);
                    }}
                  >
                    {eachSize.size}
                  </p>
                )
            )}
          </div>
        </>
      ) : (
        <>
          <p className="eachProductDarkPara">{data.brand_details.name}</p>
          <p className="eachProductLightPara">{data.name}</p>
          <p className="eachProductDarkPara">Rs. {data.price}</p>
        </>
      )}
      <div className="eachWishListActionButtonsContainer">
        <button
          onClick={handleRemoveWishList}
          className="eachWishListRemoveButton"
        >
          <DeleteIcon />
        </button>
        <button className="eachWishListAddToBagButton" onClick={addToBag}>
          {loadingStatus ? (
            <CircularProgress
              sx={{ color: "#faeee7", marginLeft: "10px" }}
              size={28}
              thickness={5}
            />
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}

export default EachProduct;
