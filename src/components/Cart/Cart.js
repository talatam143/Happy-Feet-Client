import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BiBookmarkHeart } from "react-icons/bi";
import { BsTag } from "react-icons/bs";

import EachCartItem from "./EachCartItem";
import { getCartItems } from "../../api/CartApi";
import cartBag from "../../images/cartbag.png";
import "./Cart.css";
import { ArrowLeft, RightIcon } from "../SVG/svgrepo";
import CartSkeleton from "../Addons/CartSkeleton";

const Discount = 0;

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [price, setPrice] = useState(0);
  const [Convenience, setConvenience] = useState(200);
  const pageState = useSelector((state) => state.pageState);
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = Cookies.get("HappyT");
    if (isLoggedIn === undefined) {
      navigate("/login");
    } else {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    const { status, responseData } = await getCartItems();
    if (status === 200) {
      responseData.cartDetails.sort((a, b) => {
        const id1 = a.id;
        const id2 = b.id;
        if (id1 < id2) {
          return -1;
        }
        if (id1 > id2) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      setCartItems(responseData.cartDetails);

      let tempPrice = 0;
      for (let eachItem of responseData.cartDetails) {
        tempPrice += eachItem.price * eachItem.quantity;
      }
      if(tempPrice > 1000){
        setConvenience(0)
      } else{
        setConvenience(200)
      }
      setPrice(tempPrice);
    } else if (status === 202) {
      setCartItems([]);
    }
  };

  const updateSnackBar = (state, message) => {
    setShowSnackBar(state);
    setSnackbarMessage(message);
  };

  return (
    <div>
      {pageState.loading && <CartSkeleton />}
      {pageState.success ? (
        <>
          <div className="cartHeadingContainer">
            <button
              className="cartArrowBackButton"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
            </button>
            <div className="cartCountContainer">
              <p className="wishListHeadingPara">Shopping Bag</p>
              {cartItems.length > 0 ? (
                <p className="wishListCountPara">{cartItems.length} Items</p>
              ) : null}
            </div>
          </div>
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
              <button className="cartPlaceOrderButton">PLACE ORDER</button>
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
        </>
      ) : null}
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

export default Cart;
