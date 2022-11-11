import React, { useState } from "react";
import Cookies from "js-cookie";
import { BsThreeDots } from "react-icons/bs";
import { removeCard } from "../../../api/CustomerDetailsApi";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function EachSavedAddress(props) {
  const { eachCard, showActionsButtons, updateState, deleteCardsStatus } =
    props;
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [apiState, setApiState] = useState("INITIAL");
  const [errorState, setErrorState] = useState(false);

  const deleteAddress = async () => {
    setApiState("LOADING");
    let num = Cookies.get("num");
    let sendData = { cardId: eachCard.id, number: num };
    const { status, data } = await removeCard(sendData);
    if (status === 200) {
      setApiState("SUCCESS");
      deleteCardsStatus(true, data.message);
    } else {
      setApiState("ERROR");
      setErrorState(true);
    }
  };

  return (
    <div className="eachMyAddressContainer">
      <div className="eachMySubAddressContainer">
        <p className="boldMyAddressPara">
          **** **** **** {eachCard.fourDigits}
        </p>
        <div className="eachMySubActionsAddressContainer">
          {eachCard.default && (
            <p className="myAddressDefaultPara" style={{ marginRight: "10px" }}>
              Default
            </p>
          )}
          <button
            className="eachCardThreeDotsButton"
            onClick={() => {
              updateState(eachCard.id);
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p className="boldMyAddressPara">{eachCard.cardholder}</p>
        <p className="myAddressParas">
          Valid Thru: {eachCard.validThru.toString().slice(0, 2)}/
          {eachCard.validThru.toString().slice(-2)}
        </p>
      </div>

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
