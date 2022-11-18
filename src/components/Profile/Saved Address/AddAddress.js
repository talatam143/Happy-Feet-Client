import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";

import "./AddAddress.css";
import { addAddress } from "../../../api/CustomerDetailsApi";

const initialFormData = {
  name: "",
  addressMobileNumber: "",
  pincode: "",
  state: "",
  address: "",
  locality: "",
  city: "",
  type: "",
  defaultAddress: false,
};

function AddAddress(props) {
  const { closeDialog } = props;
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiState, setApiState] = useState("INITIAL");

  const handleCloseDialog = () => {
    setFormData(initialFormData);
    closeDialog();
  };

  const handleFormChange = (e) => {
    setError(false);
    if (e.target.name === "defaultAddress") {
      if (e.target.checked === true) {
        setFormData({ ...formData, [e.target.name]: true });
      } else {
        setFormData({ ...formData, [e.target.name]: false });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  console.log(formData);

  const addNewAddress = async (e) => {
    e.preventDefault();
    if (formData.addressMobileNumber.length !== 10) {
      setError(true);
      setErrorMessage("Enter valid Mobile number");
    } else if (formData.pincode.length !== 6) {
      setError(true);
      setErrorMessage("Enter valid Pincode");
    } else {
      setApiState("LOADING");
      let sendData = formData;
      sendData.mobileNumber = Cookies.get("num");
      const { status, data } = await addAddress(sendData);
      if (status === 200) {
        setFormData(initialFormData);
        setApiState("SUCCESS");
        closeDialog(true, data.message);
      } else {
        setApiState("ERROR");
        setError(true);
        setErrorMessage(data.error);
      }
    }
  };

  return (
    <div>
      <div className="addNewAddressHeaderContainer">
        <p className="addNewAddressHeaderPara">Add new address</p>
        <button
          onClick={handleCloseDialog}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <IoClose style={{ fontSize: "30px" }} />
        </button>
      </div>
      <form className="addNewAddressForm" onSubmit={addNewAddress}>
        <input
          placeholder="Name"
          className="addressInput"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleFormChange}
          required
        />
        <input
          placeholder="Mobile Number"
          className="addressInput"
          name="addressMobileNumber"
          type="number"
          value={formData.addressMobileNumber}
          onChange={handleFormChange}
          required
        />
        <input
          placeholder="Pincode"
          className="addressInput"
          name="pincode"
          type="number"
          value={formData.pincode}
          onChange={handleFormChange}
          required
        />
        <input
          placeholder="Address"
          className="addressInput"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleFormChange}
          required
        />
        <input
          placeholder="Locality"
          className="addressInput"
          name="locality"
          type="text"
          value={formData.locality}
          onChange={handleFormChange}
          required
        />
        <input
          placeholder="City"
          className="addressInput"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleFormChange}
          required
        />
        <input
          placeholder="State"
          className="addressInput"
          name="state"
          type="text"
          value={formData.state}
          onChange={handleFormChange}
          required
        />
        <div className="addNewAddressTypeContainer">
          <p className="addNewAddressTypePara">Type</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <input
                type="radio"
                name="type"
                value="Home"
                onChange={handleFormChange}
                id="homeRadioId"
                className="radioInputStyle"
                required
              />
              <label
                htmlFor="homeRadioId"
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#33272a",
                }}
              >
                Home
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="type"
                value="Office or Others"
                onChange={handleFormChange}
                id="othersRadioId"
                className="radioInputStyle"
                required
              />
              <label
                htmlFor="othersRadioId"
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  color: "#33272a",
                }}
              >
                Office or Others
              </label>
            </div>
          </div>
        </div>
        <div className="checkbox-con">
          <p className="addNewAddressTypePara">Default Address </p>
          <input
            id="checkbox"
            type="checkbox"
            name="defaultAddress"
            onChange={handleFormChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <button type="submit" className="addAddressSubmitButton">
            {apiState === "SUCCESS" ? (
              <CircularProgress
                size={30}
                thickness={6}
                sx={{ color: "#faeee7" }}
              />
            ) : (
              "Add Address"
            )}
          </button>
          {error && <p className="cardCvvErrorMessage">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}

export default AddAddress;
