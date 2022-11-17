import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BiBookmarkHeart } from "react-icons/bi";
import { BsTag } from "react-icons/bs";

import { addCartItems, setCartPrice } from "../../stateslices/cartStateSlice";
import { getCartItems, removeFromCart } from "../../api/CartApi";
import "./Cart.css";
import CartSkeleton from "../Addons/CartSkeleton";
import EachCartItem from "./EachCartItem";
import cartBag from "../../images/cartbag.png";
import { RightIcon } from "../SVG/svgrepo";

function Cart() {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const pageState = useSelector((state) => state.pageState);
  const cartState = useSelector((state) => state.cartState);
  const [outOfStockALert, setOutOfStockALert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let isLoggedIn = Cookies.get("HappyT");
    if (isLoggedIn === undefined) {
      navigate("/login");
    } else {
      fetchCart();
    }
  }, []);

  const goToAddress = () => {
    navigate("/cart/address");
  };

  const fetchCart = async () => {
    const { status, responseData } = await getCartItems();
    if (status === 200) {
      let tempPrice = 0;
      var convenienceFee = 200;
      for (let eachItem of responseData.cartDetails) {
        tempPrice += eachItem.price * eachItem.quantity;
      }
      if (tempPrice > 1000) {
        convenienceFee = 0;
      }
      let filterOutOfStock = responseData.cartDetails.filter(
        (eachItem) => eachItem.availableQuantity !== 0
      );
      let checkOutOfStock = responseData.cartDetails.filter(
        (eachItem) => eachItem.availableQuantity === 0
      );
      if (checkOutOfStock.length > 0) {
        setOutOfStockALert(true);
        const getNum = Cookies.get("num");
        for (let data of checkOutOfStock) {
          let itemData = { id: data.id, size: data.size, number: getNum };
          await removeFromCart(itemData);
        }
      }
      dispatch(addCartItems({ status: true, data: filterOutOfStock }));
      dispatch(
        setCartPrice({
          status: true,
          data: { Discount: 0, price: tempPrice, convenienceFee, couponId: "" },
        })
      );
    } else if (status === 202) {
      if (!cartState.isCartInitialized) {
        dispatch(addCartItems({ status: false, data: [] }));
      }
    }
  };

  const updateSnackBar = (state, message) => {
    setShowSnackBar(state);
    setSnackbarMessage(message);
  };

  return (
    <div>
      <div className="cartHeadingContainer">
        <div className="cartCountContainer">
          <p className="wishListHeadingPara">Shopping Bag</p>
          {cartState.cartItems.length > 0 ? (
            <p className="wishListCountPara">
              {cartState.cartItems.length} Items
            </p>
          ) : null}
        </div>
      </div>
      {pageState.loading && <CartSkeleton />}
      {pageState.success ? (
        <>
          <div>
            {cartState.cartItems.length > 0 ? (
              <>
                <div className="cartItemsContainer">
                  {cartState.cartItems.map((eachItem) => (
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
                    <BiBookmarkHeart className="cartWishListIcon" /> Add More
                    From WishList
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
                    PRICE DETAILS ({cartState.cartItems.length})
                  </p>
                  <hr className="cartPriceHR" />
                  <div className="cartPriceMiniParasContainer">
                    <p className="cartPriceMiniParas">Total MRP</p>
                    <p className="cartPriceMiniParas">
                      &#x20B9; {cartState.cartPriceData.price}
                    </p>
                  </div>
                  <div className="cartPriceMiniParasContainer">
                    <p className="cartPriceMiniParas">Discount on MRP</p>
                    <p className="cartPriceMiniParas">
                      -&#x20B9; {cartState.cartPriceData.Discount}
                    </p>
                  </div>
                  <div className="cartPriceMiniParasContainer">
                    <p className="cartPriceMiniParas">Coupon Discount</p>
                    <p className="cartPriceMiniParas">Apply Coupon</p>
                  </div>
                  <div className="cartPriceMiniParasContainer">
                    <p className="cartPriceMiniParas">Convenience Fee </p>
                    {cartState.cartPriceData.price > 1000 ? (
                      <p className="feeSpansPara">
                        <span className="strikeFeeSpan">&#x20B9; 200</span>{" "}
                        <span className="greenFreeSpan">FREE</span>{" "}
                      </p>
                    ) : (
                      <p className="cartPriceMiniParas">
                        {cartState.cartPriceData.convenienceFee}
                      </p>
                    )}
                  </div>
                  <hr className="cartPriceHR" />
                  <div className="cartPriceMiniParasContainer">
                    <p className="cartTotalAmountPara">Total Amount</p>
                    <p className="cartTotalAmountPara">
                      &#x20B9;{" "}
                      {cartState.cartPriceData.price +
                        cartState.cartPriceData.convenienceFee -
                        cartState.cartPriceData.Discount}
                    </p>
                  </div>
                </div>
                <button className="cartPlaceOrderButton" onClick={goToAddress}>
                  SELECT ADDRESS
                </button>
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
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={outOfStockALert}
              autoHideDuration={3000}
              onClose={() => setOutOfStockALert(false)}
            >
              <MuiAlert
                elevation={6}
                severity="error"
                variant="filled"
                onClose={() => setOutOfStockALert(false)}
              >
                Some items in your cart were out of stock
              </MuiAlert>
            </Snackbar>
          </div>
        </>
      ) : null}
      <Outlet />
    </div>
  );
}

export default Cart;
