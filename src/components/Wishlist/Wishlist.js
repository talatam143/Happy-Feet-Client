import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { getWishListProducts } from "../../api/WishListApi";
import EachProduct from "./EachProduct";
import heart from "../../images/heart.png";
import "./Wishlist.css";
import ProductSkeleton from "../Addons/ProductSkeleton";

function Wishlist() {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [whishListItems, setWishListItems] = useState([]);
  const pageState = useSelector((state) => state.pageState);
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = Cookies.get("HappyT");
    if (isLoggedIn === undefined) {
      navigate("/login");
    } else {
      fetchWishListProducts();
    }
  }, []);

  const updateSnackBar = (state, message) => {
    setShowSnackBar(state);
    setSnackbarMessage(message);
  };

  const fetchWishListProducts = async () => {
    const { status, responseData } = await getWishListProducts();
    if (status === 200) {
      setWishListItems(responseData.getWishListProducts);
    } else if (status === 404) {
      setWishListItems([]);
    }
  };

  return (
    <div>
      {pageState.loading && <ProductSkeleton />}
      <div className="wishListHeadingContainer">
        <p className="wishListHeadingPara">Wishlist</p>
        {whishListItems.length > 0 ? (
          <p className="wishListCountPara">{whishListItems.length} products</p>
        ) : null}
      </div>
      {pageState.success ? (
        <>
          {whishListItems.length > 0 ? (
            <div className="wishListProductsContainer">
              {whishListItems.map((eachProduct) => (
                <EachProduct
                  key={eachProduct._id}
                  data={eachProduct}
                  fetchWishListProducts={fetchWishListProducts}
                  updateSnackBar={updateSnackBar}
                />
              ))}
            </div>
          ) : (
            <div className="wishListNoItemsContainer">
              <div className="wishListNoItemsDataContainer">
                <img src={heart} alt="wishlist icon" width="84px" />
                <p className="wishListNoItemsDataContainerPara">
                  Your wishlist is empty
                </p>
                <p className="wishListNoItemsDataContainerMiniPara">
                  Hang your wishes where you can make them come true.
                </p>
              </div>
              <button
                className="wishListContinueButton"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </>
      ) : null}
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

export default Wishlist;
