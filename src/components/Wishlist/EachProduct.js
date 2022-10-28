import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "../SVG/svgrepo";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { removeFromWishList } from "../../api/WishListApi";
import "./EachWishList.css";
import { useSelector } from "react-redux";

function EachProduct(props) {
  const { data,fetchWishListProducts } = props;
  const navigate = useNavigate();
  const user = useSelector((state) => state.userState);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRemoveWishList = async () => {
    const getCookie = Cookies.get("HappyT");
    if (getCookie === undefined) {
      navigate("/login");
    } else {
      const wishlistData = { mobileNumber: user.number, id: data._id };
      const { status, responseData } = await removeFromWishList(wishlistData);
      if (status === 200) {
        fetchWishListProducts();
        setSnackbarMessage(responseData.message);
        setShowSnackBar(true);
      }
    }
  };

  const navigateToView = (e) => {
    const tag = e.target.tagName;

    if (tag !== "BUTTON" && tag !== "svg" && tag !== "path") {
      navigate(`/products/${data._id}`);
    }
  };

  return (
    <div className="eachProductContainer" onClick={navigateToView}>
      <img
        src={`${process.env.REACT_APP_SERVER_URL}${data.files[0].filePath}`}
        alt="product"
        className="eachProductImage"
      />
      <p className="eachProductDarkPara">{data.brand_details.name}</p>
      <p className="eachProductLightPara">{data.name}</p>
      <p className="eachProductDarkPara">Rs. {data.price}</p>
      <div className="eachWishListActionButtonsContainer">
        <button onClick={handleRemoveWishList} className="eachWishListRemoveButton"><DeleteIcon/></button>
        <button className="eachWishListAddToBagButton"> Add to Cart</button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        autoHideDuration={1000}
        onClose={() => setShowSnackBar(false)}
      >
        <MuiAlert
          elevation={6}
          severity="success"
          variant="outlined"
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#e53170",
            fontWeight: "600",
            fontSize: "16px",
            borderRadius: "8px",
            padding: "0 10px",
          }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default EachProduct;
