import Cookies from "js-cookie";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleOrder } from "../../api/OrdersApi";
import ViewOrderSkeleton from "../Addons/ViewOrderSkeleton";
import { ArrowLeft } from "../SVG/svgrepo";

function ViewOrder() {
  const navigate = useNavigate();
  const params = useParams();
  const [pageState, setPageState] = useState("INITIAL");
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    setPageState("LOADING");
    let num = Cookies.get("num");
    let filter = num + "&" + params.id;
    const { status, data } = await getSingleOrder(filter);
    if (status === 200) {
      setDetails(data.details);
      setPageState("SUCCESS");
    } else {
      setPageState("ERROR");
    }
  };
  console.log(details);

  return (
    <div className="ordersContainer">
      <div className="accountMyAddressHeaderContainer">
        <button
          onClick={() => navigate(-1)}
          className="myAddressHeaderArrowButton"
        >
          <ArrowLeft />
        </button>
        <p className="myAddressHeaderHeading">My Orders</p>
      </div>
      {(pageState === "INITIAL" || pageState === "LOADING") && (
        <div style={{ marginTop: "70px" }}>
          <ViewOrderSkeleton />
        </div>
      )}
      {pageState === "SUCCESS" && (
        <div className="viewOrderDetailsContainer">
          <div className="viewOrderDetailsPaymentCards">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="orderPaymentCardParaB">
                Total Amount: Rs.{details.order[0].totalPrice}
              </p>
              <p className="orderPaymentCardPara">
                {moment(details.order[0].orderedDate).format("ll")}
              </p>
            </div>
            <p className="orderPaymentCardPara">Paid by Card</p>
            <hr className="orderPaymentCardHr" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="orderPaymentCardLinks">Delivery Address</p>
              <p className="orderPaymentCardLinks">Order Details</p>
            </div>
          </div>
          <div className="viewOrderItemsContainer">
            {details.order[0].items.map((eachItem) => (
              <div key={eachItem.id} className="viewOrderEachItemContainer">
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}${eachItem.image}`}
                  alt="item"
                  className="viewOrderItemImage"
                />
                <div className="viewOrderEachParaContainer">
                  <div className="viewOrderEachSpecificContainer">
                    <p className="viewOrderEachParaB">{eachItem.brand}</p>
                    <p
                      className="orderPaymentCardLinkSpecial"
                      onClick={() => navigate(`/products/${eachItem.id}`)}
                    >
                      Buy again
                    </p>
                  </div>
                  <p className="viewOrderEachPara">{eachItem.name}</p>
                  <p className="viewOrderEachParaB">Rs.{eachItem.price}</p>
                  <div className="viewOrderEachSpecificContainer">
                    <p className="viewOrderEachParaS">
                      Qty: {eachItem.quantity}
                    </p>
                    <p className="viewOrderEachParaS">Size: {eachItem.size}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="viewOrderPaymentDetailsContainer">
            <p className="viewOrderPaymentDetailsHeading">
              Order Payment Details
            </p>
            <div className="viewOrderPaymentDetailsSubContainer">
              <p className="viewOrderPaymentDetailsPara">Order Amount</p>
              <p className="viewOrderPaymentDetailsPara">
                {details.order[0].totalPrice -
                  details.order[0].convenienceFee -
                  details.order[0].discount}
              </p>
            </div>
            <div className="viewOrderPaymentDetailsSubContainer">
              <p className="viewOrderPaymentDetailsPara">Coupon Savings</p>
              <p className="viewOrderPaymentDetailsPara">
                {details.order[0].discount}
              </p>
            </div>
            <div className="viewOrderPaymentDetailsSubContainer">
              <p className="viewOrderPaymentDetailsPara">Convenience Fee</p>
              <p className="viewOrderPaymentDetailsPara">
                {details.order[0].convenienceFee > 0 ? (
                  details.order[0].convenienceFee
                ) : (
                  <span style={{ color: "#00C853" }}>Free</span>
                )}
              </p>
            </div>
            <div className="viewOrderPaymentDetailsSubContainer">
              <p className="viewOrderPaymentDetailsParaB">Order Total</p>
              <p className="viewOrderPaymentDetailsParaB">
                Rs.{details.order[0].totalPrice}
              </p>
            </div>
            <hr className="viewOrderPaymentDetailsHR" />
            <p className="viewOrderPaymentDetailsHeadingTwo">
              Payment Mode (Card)
            </p>
            <div className="viewOrderPaymentDetailsSubContainerCard">
              <p className="viewOrderPaymentDetailsParaCard">
                **** **** **** {details.card[0].fourDigits}
              </p>
              <p className="viewOrderPaymentDetailsParaCard">
                {details.card[0].cardholder}
              </p>
            </div>
          </div>
          <div className="viewOrderAddressContainer">
            <p className="addressParaHeading">Delivery to</p>
            <p className="orderAddressParaBold">{details.address[0].name}</p>
            <p className="orderAddressPara">{details.address[0].address}</p>
            <p className="orderAddressPara">{details.address[0].locality}</p>
            <p className="orderAddressPara">
              {" "}
              {`${details.address[0].city}, ${details.address[0].state}, ${details.address[0].pincode}`}
            </p>
            <p className="orderAddressParaBold">
              {details.address[0].customerMobileNumber}
            </p>
          </div>
        </div>
      )}
      {pageState === "ERROR" && (
        <div className="ordersNoOrdersContainer">
          <p className="noOrdersPara">Something went wrong</p>
          <button className="OrderShopNowButton" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewOrder;
