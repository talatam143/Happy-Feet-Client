import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyOrders } from "../../api/OrdersApi";
import { ArrowLeft } from "../SVG/svgrepo";
import { BiChevronRight } from "react-icons/bi";

import "./Orders.css";
import OrderSkeleton from "../Addons/OrderSkeleton";

function Orders() {
  const navigate = useNavigate();
  const [ordersList, setOrdersList] = useState([]);
  const [pageState, setPageState] = useState("INITIAL");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setPageState("LOADING");
    const { status, data } = await getMyOrders();
    if (status === 404) {
      setOrdersList([]);
      setPageState("SUCCESS");
    } else if (status === 200) {
      setOrdersList(data.data.order);
      setPageState("SUCCESS");
    }
  };

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
          <OrderSkeleton />
        </div>
      )}

      {pageState === "SUCCESS" && (
        <div>
          {ordersList.length > 0 ? (
            <div className="ordersDetailsContainer">
              {ordersList.map((eachOrder) => (
                <Link
                  key={eachOrder.orderId}
                  className="orderLink"
                  to={`/account/myorders/${eachOrder.orderId}`}
                >
                  <p className="orderIdPara">
                    ORDER ID :{" "}
                    <span className="orderIdSpan">
                      {eachOrder.orderId.split("-")[4]}
                    </span>
                  </p>
                  {eachOrder.items.map((eachItem) => (
                    <div key={eachItem.id} className="eachOrderItemContainer">
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}${eachItem.image}`}
                        alt="order item"
                        className="eachOrderItemImage"
                      />
                      <div>
                        <p className="eachItemNamePara">{eachItem.name}</p>
                        <p className="eachItemPara">{eachItem.brand}</p>
                      </div>
                      <BiChevronRight className="eachItemArrowIcon" />
                    </div>
                  ))}
                </Link>
              ))}
            </div>
          ) : (
            <div className="ordersNoOrdersContainer">
              <p className="noOrdersPara">No Orders placed.</p>
              <button
                className="OrderShopNowButton"
                onClick={() => navigate("/")}
              >
                Shop Now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
