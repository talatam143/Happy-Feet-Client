import React, { useState } from "react";
import Cookies from "js-cookie";
import { BiHome, BiBuildingHouse } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { removeAddress } from "../../../api/CustomerDetailsApi";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function EachSavedAddress(props) {
  const { eachAddress, showActionsButtons, updateState, deleteAddressStatus } =
    props;
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [apiState, setApiState] = useState("INITIAL");
  const [errorState, setErrorState] = useState(false);

  const deleteAddress = async () => {
    setApiState("LOADING");
    let num = Cookies.get("num");
    let sendData = { addressId: eachAddress.id, number: num };
    const { status, data } = await removeAddress(sendData);
    if (status === 200) {
      setApiState("SUCCESS");
      deleteAddressStatus(true, data.message);
    } else {
      setApiState("ERROR");
      setErrorState(true);
    }
  };

  return (
    <div className="eachMyAddressContainer">
      <div className="eachMySubAddressContainer">
        <p className="boldMyAddressPara">{eachAddress.name}</p>
        <div className="eachMySubActionsAddressContainer">
          {eachAddress.default && (
            <p className="myAddressDefaultPara">Default</p>
          )}
          {eachAddress.type.toLowerCase() === "home" ? (
            <BiHome className="myAddressHomeIcon" />
          ) : (
            <BiBuildingHouse className="myAddressHomeIcon" />
          )}
          <button
            className="eachCardThreeDotsButton"
            onClick={() => {
              updateState(eachAddress.id);
              setDeletePrompt(false);
            }}
          >
            <BsThreeDots className="eachCardThreeDotsIcon" />
          </button>
        </div>
      </div>
      <div
        className={
          showActionsButtons
            ? "myAddressActionButtonsContainer"
            : "hideMyAddressActionButtonsContainer"
        }
      >
        <button
          className="eachAddressEachActionButton"
          style={{ border: "solid", borderWidth: "0 0 1px 0" }}
        >
          Edit
        </button>

        <button
          className="eachAddressEachActionButton"
          onClick={() => setDeletePrompt(true)}
        >
          Delete
        </button>
      </div>
      <p className="myAddressParas">{eachAddress.address}</p>
      <p className="myAddressParas">{eachAddress.locality}</p>
      <p className="myAddressParas">
        {eachAddress.city}, {eachAddress.state}, {eachAddress.pincode}
      </p>
      <p className="boldMyAddressPara">{eachAddress.customerMobileNumber}</p>
      {deletePrompt && (
        <div className="eachCardDeletePromptContainer">
          <p className="eachCardDeletePromptPara">Confirm Delete ..?</p>
          {apiState === "LOADING" ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CircularProgress
                size={30}
                thickness={6}
                sx={{ color: "#00c853" }}
              />
            </div>
          ) : (
            <div>
              <button
                className="eachCardDeletePromptYesButtons"
                onClick={deleteAddress}
              >
                Yes
              </button>
              <button
                className="eachCardDeletePromptNoButtons"
                onClick={() => setDeletePrompt(false)}
              >
                No
              </button>
            </div>
          )}
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errorState}
        autoHideDuration={1000}
        onClose={() => setErrorState(false)}
      >
        <MuiAlert elevation={6} severity="error" variant="filled">
          Something Went Wrong
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default EachSavedAddress;
