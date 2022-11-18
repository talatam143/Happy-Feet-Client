/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbAddressBook } from "react-icons/tb";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Cookies from "js-cookie";

import { getAddress } from "../../../api/CustomerDetailsApi";
import { ArrowLeft } from "../../SVG/svgrepo";
import {
  loadingState,
  successState,
  failedState,
} from "../../../stateslices/pageStateSlice";
import "./SavedAddress.css";
import CartSkeleton from "../../Addons/CartSkeleton";
import EachSavedAddress from "./EachSavedAddress";
import AddAddress from "./AddAddress";
import { Dialog } from "@mui/material";

function SavedAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.pageState);
  const [addressList, setAddressList] = useState([]);
  const [selectedId, setSelectedId] = useState(false);
  const [newAddressDialog, setNewAddressDialog] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setShowSnackbarMessage] = useState("");

  useEffect(() => {
    let isLoggedIn = Cookies.get("HappyT");
    let isNum = Cookies.get("num");
    if (isLoggedIn === undefined || isNum === undefined) {
      navigate("/login");
    } else {
      fetchAddress();
    }
  }, []);

  const fetchAddress = async () => {
    dispatch(loadingState());
    const { status, data } = await getAddress();
    if (status === 200) {
      setAddressList(data.address.address);
      dispatch(successState());
    } else if (status === 404) {
      setAddressList([]);
      dispatch(successState());
    } else {
      dispatch(failedState());
    }
  };

  const updateState = (id) => {
    if (id === selectedId) {
      setSelectedId("");
    } else {
      setSelectedId(id);
    }
  };

  const closeDialog = (state, message) => {
    if (state !== undefined && message !== undefined) {
      fetchAddress();
      setNewAddressDialog(false);
      setShowSnackBar(state);
      setShowSnackbarMessage(message);
    } else {
      setNewAddressDialog(false);
    }
  };

  const deleteAddress = (state, message) => {
    fetchAddress();
    setShowSnackBar(state);
    setShowSnackbarMessage(message);
  };

  return (
    <div className="accountMyAddressContainer">
      <div className="accountMyAddressHeaderContainer">
        <button
          onClick={() => navigate(-1)}
          className="myAddressHeaderArrowButton"
        >
          <ArrowLeft />
        </button>
        <p className="myAddressHeaderHeading">My Address</p>
      </div>
      {pageState.loading && <CartSkeleton />}
      {pageState.success && (
        <div className="myAddressBodyContainer">
          <div className="addNewAddressContainer">
            <button
              className="addNewAddressButton"
              onClick={() => setNewAddressDialog(true)}
            >
              <TbAddressBook className="addNewAddressIcon" /> Add new Address
            </button>
          </div>
          {addressList.length > 0 ? (
            <div className="MyAddressListContainer">
              {addressList.map((eachAddress) => (
                <EachSavedAddress
                  eachAddress={eachAddress}
                  deleteAddressStatus={deleteAddress}
                  key={eachAddress.id}
                  showActionsButtons={
                    selectedId === eachAddress.id ? true : false
                  }
                  updateState={updateState}
                />
              ))}
            </div>
          ) : (
            <div className="myAddressEmptyContainer">
              <p className="noAddressPara">
                No address found. Click on add new address to add Address
              </p>
            </div>
          )}
        </div>
      )}
      <Dialog open={newAddressDialog} maxWidth="xl" fullWidth>
        <AddAddress closeDialog={closeDialog} />
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        autoHideDuration={1000}
        onClose={() => setShowSnackBar(false)}
      >
        <MuiAlert elevation={6} severity="success" variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default SavedAddress;
