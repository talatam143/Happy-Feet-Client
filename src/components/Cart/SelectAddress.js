import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { GrFormClose } from "react-icons/gr";
import { useSelector } from "react-redux";

import "./Address.css";
import { getAddress } from "../../api/CustomerDetailsApi";
import { addCartAddress } from "../../stateslices/cartStateSlice";
import { ArrowLeft } from "../SVG/svgrepo";
import CartSkeleton from "../Addons/CartSkeleton";

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

function SelectAddress() {
  const [addressList, setAddressList] = useState([]);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [markedAddress, setMarkedAddress] = useState(null);
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const [addressError, setAddressError] = useState(false);
  const cartState = useSelector((state) => state.cartState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartState.isCartInitialized) {
      fetchAddressList();
    } else {
      navigate("/cart");
    }
  }, []);

  const changingAddress = (e) => {
    setMarkedAddress(e.target.value);
  };

  const changeAddress = () => {
    let address = addressList.filter(
      (eachAddress) => eachAddress.id === markedAddress
    );
    dispatch(addCartAddress(address[0]));
    setOpenAddressModal(false);
  };

  const goToPayment = () => {
    if (cartState.isAddressInitialized) {
      navigate("/cart/payments");
    } else {
      setAddressError(true);
    }
  };

  const fetchAddressList = async () => {
    setApiStatus("LOADING");
    const { status, data } = await getAddress();
    if (status === 200) {
      setAddressList(data.address.address);
      let address = data.address.address.filter(
        (eachAddress) => eachAddress.default === true
      );
      if (address.length === 1) {
        if (!cartState.isAddressInitialized) {
          dispatch(addCartAddress(address[0]));
          setMarkedAddress(address[0].id);
        } else {
          setMarkedAddress(cartState.cartAddress.id);
        }
      } else {
        if (!cartState.isAddressInitialized) {
          dispatch(addCartAddress(data.address.address[0]));
          setMarkedAddress(data.address.address[0].id);
        } else {
          setMarkedAddress(cartState.cartAddress.id);
        }
      }
      setApiStatus("SUCCESS");
    } else if (status === 404) {
      setAddressList([]);
      setApiStatus("SUCCESS");
    }
  };

  return (
    <div>
      <div className="cartHeadingContainer">
        <button className="cartArrowBackButton" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <p className="wishListHeadingPara">Address</p>
      </div>
      {(apiStatus === "INITIAL" || apiStatus === "LOADING") && (
        <div style={{ marginTop: "70px" }}>
          <CartSkeleton />
        </div>
      )}
      {apiStatus === "SUCCESS" && (
        <>
          <div className="cartAddressContainer">
            {addressList.length > 0 ? (
              <>
                <div className="cartSelectedAddressContainer">
                  <div className="cartAddressNameContainer">
                    <p className="cartAddressBoldParas">
                      {cartState.cartAddress.name}
                      {cartState.cartAddress.default && (
                        <span className="cartAddressDefaultSpan">
                          (Default)
                        </span>
                      )}
                    </p>
                    <p className="cartAddressTypePara">
                      {cartState.cartAddress.type}
                    </p>
                  </div>
                  <p className="cartAddressPara">
                    {cartState.cartAddress.address}
                  </p>
                  <p className="cartAddressPara">
                    {cartState.cartAddress.locality}
                  </p>
                  <p className="cartAddressPara">
                    {`${cartState.cartAddress.city}, ${cartState.cartAddress.state}, ${cartState.cartAddress.pincode}`}
                  </p>
                  <p className="cartAddressPara" style={{ marginTop: "10px" }}>
                    Mobile:{" "}
                    <span className="cartAddressBoldParas">
                      {cartState.cartAddress.customerMobileNumber}
                    </span>{" "}
                  </p>
                  <button
                    className="cartChangeAddressButton"
                    onClick={() => setOpenAddressModal(true)}
                  >
                    CHANGE OR ADD ADDRESS
                  </button>
                </div>
              </>
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
                  No Address
                </p>
                <button
                  style={{ width: "90%", marginLeft: "5%" }}
                  className="cartChangeAddressButton"
                >
                  ADD ADDRESS
                </button>
              </div>
            )}
            <p className="cartAddressDeliveryPara">Delivery Estimates</p>
            {cartState.cartItems.map((eachItem) => (
              <div
                key={eachItem.id + eachItem.size}
                className="cartAddressDeliveryContainer"
              >
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}${eachItem.image}`}
                  alt="itemImage"
                  className="eachCartAddressImage"
                />
                {addressList.length > 1 ? (
                  <p className="eachCartAddressPara">
                    Estimated delivery by{" "}
                    <span className="eachCartAddressDateSpan">
                      {date.getDate() +
                        10 +
                        " " +
                        monthNames[date.getUTCMonth()] +
                        " " +
                        date.getFullYear()}
                    </span>
                  </p>
                ) : (
                  <p className="eachCartAddressPara">
                    {" "}
                    Please add or Select address
                  </p>
                )}
              </div>
            ))}
            <button className="cartPlaceOrderButton" onClick={goToPayment}>
              SELECT PAYMENT
            </button>
            {addressError && <p className="cardCvvErrorMessage" style={{textAlign:"center"}}>*Select address</p>}
            <Dialog open={openAddressModal} fullWidth>
              <div className="selectAddressModalContainer">
                <div className="selectAddressHeaderContainer">
                  <p className="selectAddressModalHeadingPara">
                    Select Address
                  </p>
                  <button
                    className="selectAddressModalCloseButton"
                    onClick={() => setOpenAddressModal(false)}
                  >
                    <GrFormClose className="selectAddressModalCloseIcon" />
                  </button>
                </div>
                <p className="selectAddressSubHeadingParas">Default</p>
                {addressList.map(
                  (eachAddress) =>
                    eachAddress.default === true && (
                      <div
                        className="modalDefaultAddressContainer"
                        key={eachAddress.id}
                      >
                        <input
                          type="radio"
                          id={eachAddress.id}
                          value={eachAddress.id}
                          name="address"
                          onChange={changingAddress}
                          checked={markedAddress === eachAddress.id}
                        />
                        <label
                          htmlFor={eachAddress.id}
                          className="modalDefaultAddressLabel"
                        >
                          <div className="modalDefaultAddressSubContainer">
                            <div className="cartAddressNameContainer">
                              <p className="cartAddressBoldParas">
                                {eachAddress.name}
                              </p>
                              <p className="modalAddressTypePara">
                                {eachAddress.type}
                              </p>
                            </div>
                            <p className="cartAddressPara">
                              {eachAddress.address}
                            </p>
                            <p className="cartAddressPara">
                              {eachAddress.locality}
                            </p>
                            <p className="cartAddressPara">
                              {`${eachAddress.city}, ${eachAddress.state}, ${eachAddress.pincode}`}
                            </p>
                            <p
                              className="cartAddressPara"
                              style={{ marginTop: "10px" }}
                            >
                              Mobile:{" "}
                              <span className="cartAddressBoldParas">
                                {eachAddress.customerMobileNumber}
                              </span>{" "}
                            </p>
                          </div>
                        </label>
                      </div>
                    )
                )}
                <p className="selectAddressSubHeadingParas">Others</p>
                {addressList.map(
                  (eachAddress) =>
                    eachAddress.default !== true && (
                      <div
                        className="modalDefaultAddressContainer"
                        key={eachAddress.id}
                      >
                        <input
                          type="radio"
                          id={eachAddress.id}
                          value={eachAddress.id}
                          name="address"
                          onChange={changingAddress}
                          checked={markedAddress === eachAddress.id}
                        />
                        <label htmlFor={eachAddress.id}>
                          <div className="modalDefaultAddressSubContainer">
                            <div className="cartAddressNameContainer">
                              <p className="cartAddressBoldParas">
                                {eachAddress.name}
                              </p>
                              <p className="modalAddressTypePara">
                                {eachAddress.type}
                              </p>
                            </div>
                            <p className="cartAddressPara">
                              {eachAddress.address}
                            </p>
                            <p className="cartAddressPara">
                              {eachAddress.locality}
                            </p>
                            <p className="cartAddressPara">
                              {`${eachAddress.city}, ${eachAddress.state}, ${eachAddress.pincode}`}
                            </p>
                            <p
                              className="cartAddressPara"
                              style={{ marginTop: "10px" }}
                            >
                              Mobile:{" "}
                              <span className="cartAddressBoldParas">
                                {eachAddress.customerMobileNumber}
                              </span>{" "}
                            </p>
                          </div>
                        </label>
                      </div>
                    )
                )}
                <button
                  className="selectAddressModalSelectButton"
                  onClick={changeAddress}
                >
                  SELECT
                </button>
              </div>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}

export default SelectAddress;
