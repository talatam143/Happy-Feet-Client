import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { GrFormClose } from "react-icons/gr";

import "./Address.css";

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

function Address(props) {
  const { addressList, cartItems } = props;
  const [selectedAddress, setSelectedAddress] = useState({});
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [markedAddress, setMarkedAddress] = useState(null);

  useEffect(() => {
    let address = addressList.address.filter(
      (eachAddress) => eachAddress.default === true
    );
    setSelectedAddress(address[0]);
    setMarkedAddress(address[0].id)
  }, []);

  const changingAddress = (e) => {
    setMarkedAddress(e.target.value);
  };

  const changeAddress = () => {
    let address = addressList.address.filter(
      (eachAddress) => eachAddress.id === markedAddress
    );
    setSelectedAddress(address[0]);
    setOpenAddressModal(false);
  };

  return (
    <div className="cartAddressContainer">
      <div className="cartSelectedAddressContainer">
        <div className="cartAddressNameContainer">
          <p className="cartAddressBoldParas">
            {selectedAddress.name}
            {selectedAddress.default && (
              <span className="cartAddressDefaultSpan">(Default)</span>
            )}
          </p>
          <p className="cartAddressTypePara">{selectedAddress.type}</p>
        </div>
        <p className="cartAddressPara">{selectedAddress.address}</p>
        <p className="cartAddressPara">{selectedAddress.locality}</p>
        <p className="cartAddressPara">
          {`${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.pincode}`}
        </p>
        <p className="cartAddressPara" style={{ marginTop: "10px" }}>
          Mobile:{" "}
          <span className="cartAddressBoldParas">
            {selectedAddress.customerMobileNumber}
          </span>{" "}
        </p>
        <button
          className="cartChangeAddressButton"
          onClick={() => setOpenAddressModal(true)}
        >
          CHANGE OR ADD ADDRESS
        </button>
      </div>
      <p className="cartAddressDeliveryPara">Delivery Estimates</p>
      {cartItems.map((eachItem) => (
        <div
          key={eachItem.id + eachItem.size}
          className="cartAddressDeliveryContainer"
        >
          <img
            src={`${process.env.REACT_APP_SERVER_URL}${eachItem.image}`}
            alt="itemImage"
            className="eachCartAddressImage"
          />
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
        </div>
      ))}
      <Dialog open={openAddressModal} fullWidth>
        <div className="selectAddressModalContainer">
          <div className="selectAddressHeaderContainer">
            <p className="selectAddressModalHeadingPara">Select Address</p>
            <button
              className="selectAddressModalCloseButton"
              onClick={() => setOpenAddressModal(false)}
            >
              <GrFormClose className="selectAddressModalCloseIcon" />
            </button>
          </div>
          <p className="selectAddressSubHeadingParas">Default</p>
          {addressList.address.map(
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
                    checked = {markedAddress === eachAddress.id}
                  />
                  <label htmlFor={eachAddress.id} className="modalDefaultAddressLabel">
                    <div className="modalDefaultAddressSubContainer">
                      <div className="cartAddressNameContainer">
                        <p className="cartAddressBoldParas">
                          {eachAddress.name}
                        </p>
                        <p className="modalAddressTypePara">
                          {eachAddress.type}
                        </p>
                      </div>
                      <p className="cartAddressPara">{eachAddress.address}</p>
                      <p className="cartAddressPara">{eachAddress.locality}</p>
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
          {addressList.address.map(
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
                    checked = {markedAddress === eachAddress.id}
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
                      <p className="cartAddressPara">{eachAddress.address}</p>
                      <p className="cartAddressPara">{eachAddress.locality}</p>
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
  );
}

export default Address;
