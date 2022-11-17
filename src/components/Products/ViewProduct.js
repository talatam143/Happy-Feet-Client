import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Thumbs } from "swiper";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { addToWishList, removeFromWishList } from "../../api/WishListApi";
import { getSingleProduct } from "../../api/Products";
import "./ViewProduct.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "swiper/css/thumbs";
import { ArrowLeft, ToggleWishListIcon } from "../SVG/svgrepo";
import { addToCart } from "../../api/CartApi";
import ProductViewSkeleton from "../Addons/ProductViewSkeleton";
import { CircularProgress } from "@mui/material";

function ViewProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const user = useSelector((state) => state.userState);
  const pageState = useSelector((state) => state.pageState);
  const [fetchedProduct, setFetchProduct] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [cartError, setCartError] = useState(false);
  const [cartErrorMessage, setCartErrorMessage] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [addTOBagButton, setAddTOBagButton] = useState("INITIAL");
  const [isWhishList, setIsWhishList] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchProduct();
    if (user.wishlist.includes(params.id)) {
      setIsWhishList(true);
    }
  }, []);

  const fetchProduct = async () => {
    const { status, productData } = await getSingleProduct(params.id);
    if (status === 200) {
      setProduct(productData);
      setFetchProduct(true);
    }
  };

  const addToBag = async () => {
    setCartError(false);
    if (addedToBag) {
      navigate("/cart");
    } else {
      if (selectedSize === null) {
        setSizeError(true);
      } else {
        const getNum = Cookies.get("num");
        if (getNum === undefined) {
          navigate("/login");
        } else {
          let data = {
            id: product._id,
            quantity: 1,
            size: selectedSize,
            mobileNumber: getNum,
          };
          setAddTOBagButton("LOADING");
          const { status, responseData } = await addToCart(data);
          if (status === 200) {
            setAddTOBagButton("SUCCESS");
            setAddedToBag(true);
          } else {
            setAddTOBagButton("SUCCESS");
            setAddedToBag(true);
            setCartError(true);
            setCartErrorMessage(responseData.error);
          }
        }
      }
    }
  };

  const toggleWishList = async () => {
    const getCookie = Cookies.get("HappyT");
    if (getCookie === undefined) {
      navigate("/login");
    } else {
      if (!isWhishList) {
        const wishlistData = { mobileNumber: user.number, id: params.id };
        const { status, responseData } = await addToWishList(wishlistData);
        if (status === 200) {
          setSnackbarMessage(responseData.message);
          setShowSnackBar(true);
          setIsWhishList(true);
        }
      } else {
        const wishlistData = { mobileNumber: user.number, id: params.id };
        const { status, responseData } = await removeFromWishList(wishlistData);
        if (status === 200) {
          setSnackbarMessage(responseData.message);
          setShowSnackBar(true);
          setIsWhishList(false);
        }
      }
    }
  };

  return (
    <>
      {pageState.loading && <ProductViewSkeleton />}
      {fetchedProduct ? (
        <div className="productViewContainer">
          <div className="productViewBackContainer">
            <button
              className="productViewBackIcon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
            </button>
          </div>
          <Swiper
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            grabCursor={true}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ["-20%", 0, -1],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[EffectCreative, Pagination, Thumbs]}
            className="prodictImageswiper"
          >
            {product.files.map((eachFile) => (
              <SwiperSlide key={eachFile.filePath}>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}${eachFile.filePath}`}
                  alt="productImages"
                  width="100%"
                  height="100%"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            modules={[Thumbs]}
            className="myMiniSwiper"
          >
            {product.files.map((eachFile) => (
              <SwiperSlide key={eachFile.filePath}>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}${eachFile.filePath}`}
                  alt="productImages"
                  width="100%"
                  height="100%"
                  className="swiperControlImages"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="productViewBrandNamePara">
            {product.brand_details.name}
          </p>
          <div className="productViewHeadingContainer">
            <p className="productViewHeadingPara">{product.name}</p>
            <p className="productViewHeadingPricePara">
              &#x20B9; {product.price}
            </p>
          </div>
          <div className="productViewSelectSizeContainer">
            <p className="productViewSelectSizePara">Select Size</p>
            <div className="eachSizeContainer">
              {product.size_quantity
                .sort((a, b) => (Number(a.size) < Number(b.size) ? -1 : 1))
                .map(
                  (eachSize) =>
                    eachSize.quantity > 0 && (
                      <div
                        className="productViewQuantityDisplay"
                        key={eachSize.size}
                      >
                        <p
                          className={
                            eachSize.size === selectedSize
                              ? "eachSelectedSizePara"
                              : "eachSizePara"
                          }
                          onClick={() => {
                            setSelectedSize(eachSize.size);
                            setSizeError(false);
                            setCartError(false);
                          }}
                        >
                          {eachSize.size}
                        </p>
                        {eachSize.quantity < 10 && (
                          <p className="productViewQuantityDisplayPara">
                            {eachSize.quantity} left
                          </p>
                        )}
                      </div>
                    )
                )}
            </div>
            {sizeError ? (
              <p className="selectSizeErrorPara">Select Size</p>
            ) : null}
          </div>
          <div className="productViewButtonsContainer">
            <button className="productViewAddToBagButton" onClick={addToBag}>
              {addTOBagButton === "INITIAL" && "Add to Bag"}
              {addTOBagButton === "LOADING" && (
                <CircularProgress
                  sx={{ color: "#ffffff", marginLeft: "10px" }}
                  size={28}
                  thickness={5}
                />
              )}
              {addTOBagButton === "SUCCESS" && "Go to Bag"}
            </button>
            <button
              className="productViewWishlistButton"
              onClick={toggleWishList}
            >
              {isWhishList ? (
                <ToggleWishListIcon color="#e53170" fill="#e53170" />
              ) : (
                <ToggleWishListIcon color="#33272a" fill="none" />
              )}{" "}
            </button>
          </div>
          {cartError ? (
            <p className="selectSizeErrorPara">{cartErrorMessage}</p>
          ) : null}
        </div>
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
    </>
  );
}

export default ViewProduct;
