import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";

import { getAddress } from "../../api/CustomerAddressApi";
import { getCartItems } from "../../api/CartApi";
import Items from "./Items";
import "./Cart.css";
import { ArrowLeft } from "../SVG/svgrepo";
import CartSkeleton from "../Addons/CartSkeleton";
import Address from "./Address";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [cartStatus, setCartStatus] = useState("ITEMS");
  const [cartHeaderHeading, setCartHeaderHeading] = useState("Shopping Bag");
  const [cartButtonText, setCartButtonText] = useState("SELECT ADDRESS");
  const [price, setPrice] = useState(0);
  const [Convenience, setConvenience] = useState(200);
  const [apiStatus, setApiStatus] = useState("INITIAL");
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
        return 0;
      });
      setCartItems(responseData.cartDetails);

      let tempPrice = 0;
      for (let eachItem of responseData.cartDetails) {
        tempPrice += eachItem.price * eachItem.quantity;
      }
      if (tempPrice > 1000) {
        setConvenience(0);
      } else {
        setConvenience(200);
      }
      setPrice(tempPrice);
    } else if (status === 202) {
      setCartItems([]);
    }
  };

  const changeCartState = async () => {
    if (cartStatus === "ITEMS") {
      setApiStatus("LOADING");
      const { status, data } = await getAddress();
      if (status === 200) {
        setApiStatus("SUCCESS");
        setAddressList(data);
        setCartStatus("ADDRESS");
        setCartHeaderHeading("Address");
        setCartButtonText("CHECKOUT");
      }
    }
  };

  const CartStatus = () => {
    switch (cartStatus) {
      case "ITEMS":
        return (
          <Items
            price={price}
            Convenience={Convenience}
            cartItems={cartItems}
            fetchCart={fetchCart}
          />
        );
      case "ADDRESS":
        return <Address addressList={addressList} cartItems={cartItems}/>;
      default:
        return null;
    }
  };

  const cartGoBackButton = () => {
    if (cartStatus === "ADDRESS") {
      setCartStatus("ITEMS");
      setCartHeaderHeading("Shopping Bag");
      setCartButtonText("SELECT ADDRESS");
    }
  };

  return (
    <div>
      {pageState.loading && <CartSkeleton />}
      {pageState.success ? (
        <>
          <div className="cartHeadingContainer">
            {(cartStatus === "ADDRESS" || cartStatus === "CHECKOUT") && (
              <button
                className="cartArrowBackButton"
                onClick={cartGoBackButton}
              >
                <ArrowLeft />
              </button>
            )}
            <div className="cartCountContainer">
              <p className="wishListHeadingPara">{cartHeaderHeading}</p>
              {cartItems.length > 0 ? (
                <p className="wishListCountPara">{cartItems.length} Items</p>
              ) : null}
            </div>
          </div>
          <CartStatus />
          {cartItems.length > 0 && (
            <button
              className="cartPlaceOrderButton"
              onClick={changeCartState}
              disabled={apiStatus === "LOADING"}
            >
              {apiStatus === "LOADING" ? (
                <CircularProgress
                  sx={{ color: "#faeee7" }}
                  size={35}
                  thickness={5}
                />
              ) : (
                cartButtonText
              )}
            </button>
          )}
        </>
      ) : null}
    </div>
  );
}

export default Cart;
