import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import { MdVerified } from "react-icons/md";

import CartSkeleton from "../Addons/CartSkeleton";
import { verifyCvv, getPayments } from "../../api/CustomerDetailsApi";
import { ArrowLeft } from "../SVG/svgrepo";
import { setCartPayment } from "../../stateslices/cartStateSlice";
import "./Payment.css";

function Payment() {
  const [cardsList, setCardsList] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [handleSelectedId, setHandleSelectedId] = useState(null);
  const [cvv, setLocalCvv] = useState("");
  const [pageStatus, setPageStatus] = useState("INITIAL");
  const [paymentStatus, setPaymentStatus] = useState("INITIAL");
  const [paymentError, setPaymentError] = useState(false);
  const [verifyError, setVerifyError] = useState(false);
  const cartState = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartState.isCartInitialized && cartState.isAddressInitialized) {
      fetchCards();
    } else {
      navigate("/cart");
    }
  }, []);

  const fetchCards = async () => {
    setPageStatus("LOADING");
    const { status, data } = await getPayments();
    if (status === 200) {
      setCardsList(data.cards.cards);
      setHandleSelectedId(data.cards.cards[0].id);
      setPageStatus("SUCCESS");
    } else if (status === 404) {
      setCardsList([]);
      setPageStatus("EMPTY");
    }
  };

  const handleCvv = (e) => {
    setPaymentError(false);
    if (cvv.length <= 2) {
      setLocalCvv(e.target.value);
    }
  };

  const validateCvv = async () => {
    if (cvv.length === 3) {
      setPaymentStatus("LOADING");
      const sendData = {
        mobileNumber: Cookies.get("num"),
        id: handleSelectedId,
        cvv: cvv,
      };
      const { status } = await verifyCvv(sendData);
      if (status === 200) {
        let selectedCardObject = cardsList.filter(
          (eachCard) => eachCard.id === handleSelectedId
        );
        setSelectedCard(selectedCardObject[0]);
        let data = {
          id: selectedCardObject[0].id,
          lastFourDigits: selectedCardObject[0].fourDigits,
          name: selectedCardObject[0].cardholder,
        };
        dispatch(setCartPayment(data));
        setPaymentStatus("SUCCESS");
      } else {
        setPaymentError(true);
        setPaymentStatus("FAILED");
        setLocalCvv("");
      }
    }
  };

  const goToCheckout = () => {
    if (cartState.isPaymentDone) {
    } else {
      setVerifyError(true);
    }
  };

  const PaymentStage = () => {
    switch (paymentStatus) {
      case "INITIAL":
        return (
          <button className="eachCartVerifyCvvButton" onClick={validateCvv}>
            Verify
          </button>
        );
      case "FAILED":
        return (
          <button className="eachCartVerifyCvvButton" onClick={validateCvv}>
            Verify
          </button>
        );
      case "LOADING":
        return (
          <CircularProgress
            sx={{ color: "#e53170", marginLeft: "10px" }}
            size={28}
            thickness={5}
          />
        );
      case "SUCCESS":
        return <MdVerified className="cartCardVerifiedIcon" />;
      default:
        return null;
    }
  };

  const handleCardChange = (e) => {
    setHandleSelectedId(e.target.value);
    setLocalCvv("");
    setPaymentStatus("INITIAL");
    setPaymentError(false);
    setVerifyError(false);
  };

  return (
    <div className="cartPaymentsContainer">
      <div className="cartHeadingContainer">
        <button className="cartArrowBackButton" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <p className="wishListHeadingPara">PAYMENT</p>
      </div>
      {(pageStatus === "INITIAL" || pageStatus === "LOADING") && (
        <div style={{ marginTop: "70px" }}>
          <CartSkeleton />
        </div>
      )}
      {cardsList.length > 0 ? (
        paymentStatus !== "SUCCESS" ? (
          <div className="cartPaymentCardsContainer">
            <p className="cartCheckOutHeading">Cards</p>
            {cardsList.map((eachCard) => (
              <div key={eachCard.id} className="cartPaymentEachCardContainer">
                <input
                  type="radio"
                  value={eachCard.id}
                  id={eachCard.id}
                  name="card"
                  checked={handleSelectedId === eachCard.id}
                  onChange={handleCardChange}
                />
                <label
                  htmlFor={eachCard.id}
                  className="cartPaymentEachCardLabel"
                >
                  <div className="cartPaymentEachCardSubContainer">
                    <p className="cartPaymentEachCardPars">
                      **** **** **** {eachCard.fourDigits}
                    </p>
                    {handleSelectedId === eachCard.id && (
                      <div className="cartPaymentEachCardVerifyContainer">
                        {paymentStatus !== "SUCCESS" && (
                          <input
                            type="number"
                            placeholder="CVV"
                            value={cvv}
                            onChange={handleCvv}
                            className="cartPaymentEachCardCvv"
                            maxLength={3}
                          />
                        )}
                        <PaymentStage />
                      </div>
                    )}
                  </div>
                  <div className="cartPaymentEachCardSubContainer">
                    <p className="cartPaymentEachCardPars">
                      {eachCard.cardholder}
                    </p>
                    <p className="cartPaymentEachCardPars">
                      <span>ValidThru : </span>
                      {eachCard.validThru.toString().slice(0, 2)}/
                      {eachCard.validThru.toString().slice(-2)}
                    </p>
                  </div>
                </label>
              </div>
            ))}
            {paymentError && (
              <p className="cardCvvErrorMessage">
                *Invalid CVV or Something went wrong
              </p>
            )}
          </div>
        ) : (
          <div className="verifiedCardContainer">
            <div className="cartPaymentEachCardSubContainer">
              <p className="cartPaymentEachCardPars">
                **** **** **** {selectedCard.fourDigits}
              </p>
              <div className="cartPaymentEachCardVerifyContainer">
                <PaymentStage />
              </div>
            </div>
            <div className="cartPaymentEachCardSubContainer">
              <p className="cartPaymentEachCardPars">
                {selectedCard.cardholder}
              </p>
              <p className="cartPaymentEachCardPars">
                <span>ValidThru : </span>
                {selectedCard.validThru.toString().slice(0, 2)}/
                {selectedCard.validThru.toString().slice(-2)}
              </p>
            </div>
          </div>
        )
      ) : (
        <div>
          <p
            style={{
              margin: "0 0 0 10px",
              fontWeight: 500,
              fontSize: 18,
              color: "#33272a",
            }}
          >
            No Cards
          </p>
          <button
            style={{ width: "90%", marginLeft: "5%" }}
            className="cartChangeAddressButton"
          >
            ADD CARDS
          </button>
        </div>
      )}

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
      <button className="cartPlaceOrderButton" onClick={goToCheckout}>
        CHECKOUT
      </button>
      {verifyError && (
        <p className="cardCvvErrorMessage" style={{ textAlign: "center" }}>
          Verify Card
        </p>
      )}
    </div>
  );
}

export default Payment;
