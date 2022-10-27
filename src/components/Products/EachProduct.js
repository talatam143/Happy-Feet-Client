import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToggleWishListIcon } from "../SVG/svgrepo";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { addToWishList, removeFromWishList } from "../../api/WishListApi";
import "./EachProduct.css";
import { useSelector } from "react-redux";

function EachProduct(props) {
  const { data } = props;
  const navigate = useNavigate();
  const user = useSelector((state) => state.userState);
  const [isWhishList, setIsWhishList] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (user.wishlist.includes(data._id)) {
      setIsWhishList(true);
    }
  }, []);

  const handleRemoveWishList = async () => {
    const getCookie = Cookies.get("HappyT");
    if (getCookie === undefined) {
      navigate("/login");
    } else {
      const wishlistData = { mobileNumber: user.number, id: data._id };
      const { status, responseData } = await removeFromWishList(wishlistData);
      if (status === 200) {
        setSnackbarMessage(responseData.message);
        setShowSnackBar(true);
        setIsWhishList(false);
      }
    }
  };

  const handleAddWishList = async () => {
    const getCookie = Cookies.get("HappyT");
    if (getCookie === undefined) {
      navigate("/login");
    } else {
      const wishlistData = { mobileNumber: user.number, id: data._id };
      const { status, responseData } = await addToWishList(wishlistData);
      if (status === 200) {
        setSnackbarMessage(responseData.message);
        setShowSnackBar(true);
        setIsWhishList(true);
      }
    }
  };

  return (
    <div className="eachProductContainer">
      <img
        src={`${process.env.REACT_APP_SERVER_URL}${data.files[0].filePath}`}
        alt="product"
        className="eachProductImage"
      />
      <div className="eachProductBrandWhishListContainer">
        <p className="eachProductDarkPara">{data.brand_details.name}</p>
        {isWhishList ? (
          <button
            onClick={handleRemoveWishList}
            className="eachProductWishListButton"
          >
            <ToggleWishListIcon color="#e53170" fill="#e53170" />
          </button>
        ) : (
          <button
            onClick={handleAddWishList}
            className="eachProductWishListButton"
          >
            <ToggleWishListIcon color="#33272a" fill="none" />
          </button>
        )}
      </div>
      <p className="eachProductLightPara">{data.name}</p>
      <p className="eachProductDarkPara">Rs. {data.price}</p>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        autoHideDuration={1000}
        onClose={() => setShowSnackBar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="outlined"
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#4d9a51",
            fontWeight: "800",
            fontSize: "16px",
            borderRadius: "8px",
          }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default EachProduct;
