import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BsBox } from "react-icons/bs";
import { BiHome, BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./OrderSuccessful.css";
import logo from "../../images/darklogo.png";
import { resetCart } from "../../stateslices/cartStateSlice";

const date = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function OrderSuccessful() {
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cartState.isOrderSuccess) {
      navigate("/");
    }
    dispatch(resetCart());
  }, []);

  return (
    <motion.div className="orderSuccessfulContainer">
      <motion.div
        className="orderSuccessfulSubContainer1"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{
          ease: "easeIn",
          duration: 2,
          type: "spring",
          stiffness: 60,
        }}
      >
        <motion.div
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="logoOrderContainer">
            <img
              src={logo}
              alt="brand-logo"
              className="OrderContainerBrandLogo"
            />
            <p className="orderBrandSub">Feel You'r Step</p>
          </div>
          <p className="OrderPara">Woohoo!</p>
          <p className="OrderPara1">Order placed successfully</p>
        </motion.div>

        <motion.div
          className="orderImagesContainer"
          style={{
            width:
              cartState.cartItems.length > 2
                ? "320px"
                : cartState.cartItems.length > 1
                ? "220px"
                : "120px",
          }}
        >
          {cartState.cartItems.map((eachItem) => (
            <motion.img
              initial={{ opacity: 0, x: 1000 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              src={`${process.env.REACT_APP_SERVER_URL}${eachItem.image}`}
              alt="shoe"
              className="orderImage"
              key={eachItem.image}
            />
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className="orderSuccessfulSubContainer2"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          ease: "easeIn",
          duration: 2,
          type: "spring",
          stiffness: 50,
        }}
      >
        <motion.p
          className="deliveryPara1"
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Your order will be delivered by{" "}
          {date.getDate() +
            10 +
            " " +
            monthNames[date.getUTCMonth()] +
            " " +
            date.getFullYear()}
        </motion.p>
        <motion.div
          className="orderAddressContainer"
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="addressParaHeading">Delivery Address</p>
          <p className="orderAddressParaBold">{cartState.cartAddress.name}</p>
          <p className="orderAddressPara">{cartState.cartAddress.address}</p>
          <p className="orderAddressPara">{cartState.cartAddress.locality}</p>
          <p className="orderAddressPara">
            {" "}
            {`${cartState.cartAddress.city}, ${cartState.cartAddress.state}, ${cartState.cartAddress.pincode}`}
          </p>
          <p className="orderAddressParaBold">
            {cartState.cartAddress.customerMobileNumber}
          </p>
        </motion.div>
        <div className="ordersActionsButtonContainer">
          <motion.button
            className="orderActionButtons"
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => {
              navigate("/account/myorders");
            }}
          >
            <BsBox className="orderActionButtonsSpecial" />
            Orders
          </motion.button>
          <motion.button
            className="orderActionButtons"
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            <BiHeart className="orderActionIcons" /> Wishlist
          </motion.button>
          <motion.button
            className="orderActionButtons"
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <BiHome className="orderActionIcons" />
            Home
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default OrderSuccessful;
