import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BiBookmarkHeart } from "react-icons/bi";
import { BsTag } from "react-icons/bs";

import EachCartItem from "./EachCartItem";
import cartBag from "../../images/cartbag.png";
import { RightIcon } from "../SVG/svgrepo";

const Discount = 0;

function Items(props) {
  const { price, Convenience, cartItems, fetchCart } = props;
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const updateSnackBar = (state, message) => {
    setShowSnackBar(state);
    setSnackbarMessage(message);
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        <>
          <div className="cartItemsContainer">
            {cartItems.sort().map((eachItem) => (
              <EachCartItem
                key={eachItem.id + eachItem.size}
                data={eachItem}
                fetchCart={fetchCart}
                updateSnackBar={updateSnackBar}
              />
            ))}
          </div>
          <Link
            to="/wishlist"
            style={{ textDecoration: "none" }}
            className="cartWishListParaLink"
          >
            <p className="cartWishListPara">
              <BiBookmarkHeart className="cartWishListIcon" /> Add More From
              WishList
            </p>
            <RightIcon className="cartWishListRightIcon" />
          </Link>
          <p className="cartCouponsHeadingPara">COUPONS</p>
          <div className="cartCouponsContainer">
            <p className="cartWishListPara">
              <BsTag className="cartWishListIcon" />
              Apply Coupon
            </p>
            <RightIcon className="cartWishListRightIcon" />
          </div>
          <div className="cartPiceContainer">
            <p className="cartPriceHeadingParas">
              PRICE DETAILS ({cartItems.length})
            </p>
            <hr className="cartPriceHR" />
            <div className="cartPriceMiniParasContainer">
              <p className="cartPriceMiniParas">Total MRP</p>
              <p className="cartPriceMiniParas">&#x20B9; {price}</p>
            </div>
            <div className="cartPriceMiniParasContainer">
              <p className="cartPriceMiniParas">Discount on MRP</p>
              <p className="cartPriceMiniParas">-&#x20B9; {Discount}</p>
            </div>
            <div className="cartPriceMiniParasContainer">
              <p className="cartPriceMiniParas">Coupon Discount</p>
              <p className="cartPriceMiniParas">Apply Coupon</p>
            </div>
            <div className="cartPriceMiniParasContainer">
              <p className="cartPriceMiniParas">Convenience Fee </p>
              {price > 1000 ? (
                <p className="feeSpansPara">
                  <span className="strikeFeeSpan">&#x20B9; 200</span>{" "}
                  <span className="greenFreeSpan">FREE</span>{" "}
                </p>
              ) : (
                <p className="cartPriceMiniParas">{Convenience}</p>
              )}
            </div>
            <hr className="cartPriceHR" />
            <div className="cartPriceMiniParasContainer">
              <p className="cartTotalAmountPara">Total Amount</p>
              <p className="cartTotalAmountPara">
                &#x20B9; {price + Convenience - Discount}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="wishListNoItemsContainer">
          <div className="wishListNoItemsDataContainer">
            <img src={cartBag} alt="wishlist icon" width="300px" />
            <p className="wishListNoItemsDataContainerPara">
              Hey, it feels so light!
            </p>
            <p className="wishListNoItemsDataContainerMiniPara">
              There is nothing in your bag. Let's add some items.
            </p>
          </div>
          <button
            className="wishListContinueButton"
            onClick={() => navigate("/wishlist")}
          >
            {" "}
            Add Items From Wishlist
          </button>
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        autoHideDuration={1000}
        onClose={() => setShowSnackBar(false)}
      >
        <MuiAlert elevation={6} severity="success" variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Items;
