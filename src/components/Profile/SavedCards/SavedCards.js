/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsCreditCard2Front } from "react-icons/bs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Cookies from "js-cookie";

import EachCard from "./EachCard";
import { ArrowLeft } from "../../SVG/svgrepo";
import {
  loadingState,
  successState,
  failedState,
} from "../../../stateslices/pageStateSlice";
import { getPayments } from "../../../api/CustomerDetailsApi";
import CartSkeleton from "../../Addons/CartSkeleton";
import AddCard from "./AddCards";

function SavedCards() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.pageState);
  const [cardsList, setCardsList] = useState([]);
  const [selectedId, setSelectedId] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setShowSnackbarMessage] = useState("");
  const [newCardDialog, setNewCardDialog] = useState(false);

  useEffect(() => {
    let isLoggedIn = Cookies.get("HappyT");
    let isNum = Cookies.get("num");
    if (isLoggedIn === undefined || isNum === undefined) {
      navigate("/login");
    } else {
      fetchCards();
    }
  }, []);

  const fetchCards = async () => {
    dispatch(loadingState());
    const { status, data } = await getPayments();
    if (status === 200) {
      setCardsList(data.cards.cards);
      dispatch(successState());
    } else if (status === 404) {
      setCardsList([]);
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

  const deleteCards = (state, message) => {
    fetchCards();
    setShowSnackBar(state);
    setShowSnackbarMessage(message);
  };

  const closeDialog = (state, message) => {
    if (state !== undefined && message !== undefined) {
      fetchCards();
      setNewCardDialog(false);
      setShowSnackBar(state);
      setShowSnackbarMessage(message);
    } else {
      setNewCardDialog(false);
    }
  };

  return (
    <div>
      <div className="accountMyAddressHeaderContainer">
        <button
          onClick={() => navigate(-1)}
          className="myAddressHeaderArrowButton"
        >
          <ArrowLeft />
        </button>
        <p className="myAddressHeaderHeading">My Cards</p>
      </div>
      {pageState.loading && <CartSkeleton />}
      {pageState.success && (
        <div className="myAddressBodyContainer">
          <div className="addNewAddressContainer">
            <button className="addNewAddressButton" onClick={() => setNewCardDialog(true)}>
              <BsCreditCard2Front className="addNewAddressIcon" /> Add new Card
            </button>
          </div>
          {cardsList.length > 0 ? (
            <div className="MyAddressListContainer">
              {cardsList.map((eachCard) => (
                <EachCard
                  eachCard={eachCard}
                  key={eachCard.id}
                  showActionsButtons={selectedId === eachCard.id ? true : false}
                  updateState={updateState}
                  deleteCardsStatus={deleteCards}
                />
              ))}
            </div>
          ) : (
            <div className="myAddressEmptyContainer">
              <p className="noAddressPara">
                No cards found. Click on add new card to add card
              </p>
            </div>
          )}
        </div>
      )}
      <AddCard dialogState={newCardDialog} closeDialog={closeDialog} />
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

export default SavedCards;
