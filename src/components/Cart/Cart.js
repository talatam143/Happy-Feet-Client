import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import EachCartItem from "./EachCartItem";
import { getCartItems } from "../../api/CartApi";
import cartBag from "../../images/cartbag.png";
import "./Cart.css";
import { ArrowLeft } from "../SVG/svgrepo";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
