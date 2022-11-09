import React, { useState } from "react";
import Cookies from "js-cookie";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "@mui/material/Modal";

import { resetCart } from "../../stateslices/cartStateSlice";
import { removeFromCart, updateQuantity } from "../../api/CartApi";
import { DeleteIcon } from "../SVG/svgrepo";
import "./Cart.css";
import { addToWishList } from "../../api/WishListApi";

const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function EachCartItem(props) {
  const { data, fetchCart, updateSnackBar } = props;
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [quantityModel, setQuantityModel] = useState(false);
  const [selectQuantity, setSelectQuantity] = useState(data.quantity);

  const updateCart = async () => {
    const getNum = Cookies.get("num");
    let itemData = { id: data.id, size: data.size, number: getNum };
    const { status, responseData } = await removeFromCart(itemData);
    if (status === 200) {
      fetchCart();
      updateSnackBar(true, responseData.message);
    }
  };

  const addWishList = async () => {
    const getNum = Cookies.get("num");
    const wishlistData = { mobileNumber: getNum, id: data.id };
    const { status } = await addToWishList(wishlistData);
    if (status === 200) {
      updateCart();
    }
  };

  const updateItem = async () => {
    const getNum = Cookies.get("num");
    let itemData = {
      id: data.id,
      size: data.size,
      number: getNum,
      quantity: selectQuantity,
    };
    const { status, responseData } = await updateQuantity(itemData);
    if (status === 200) {
      setQuantityModel(false);

      fetchCart();
      updateSnackBar(true, responseData.message);
    }
  };

  return (
    <div className="eachCartItemContainer">
      <img
        src={`${process.env.REACT_APP_SERVER_URL}${data.image}`}
        alt="itemImage"
        className="eachCartItemImage"
      />
      <div className="eachCartItemParasContainer">
        <div className="eachCartItemBrandContainer">
          <p className="eachCartItemBrandPara">{data.brand}</p>
          <button
            className="eachCartItemDeleteButton"
            onClick={() => setOpenRemoveModal(true)}
          >
            <DeleteIcon />
          </button>
        </div>
        <p className="eachCartItemNamePara">{data.name}</p>
        <p className="eachCartItemPricePara">&#x20B9; {data.price}</p>
        <div className="eachCartItemQuantityContainer">
          <p className="eachCartItemSizePara">Size : {data.size}</p>
          <button
            className="eachCartItemQuantityButton"
            onClick={() => {
              setSelectQuantity(data.quantity);
              setQuantityModel(true);
            }}
          >
            <p className="eachCartItemQuantityPara">Qty : {data.quantity}</p>
          </button>
        </div>
      </div>
      <Modal open={openRemoveModal}>
        <div className="ModalDiv">
          <div className="removeItemModalHeader">
            <img
              src={`${process.env.REACT_APP_SERVER_URL}${data.image}`}
              alt="itemImage"
              className="removeItemModalImage"
            />
            <div>
              <div className="removeItemModalCloseContainer">
                <p className="removeItemModalParaOne">Move from Bag</p>
                <AiOutlineClose
                  className="modalCloseButton"
                  onClick={() => setOpenRemoveModal(false)}
                />
              </div>
              <p className="removeItemModalParaTwo">
                Are you sure you want to movie this item from bag?
              </p>
            </div>
          </div>
          <hr className="removeItemModalHR" />
          <div>
            <button
              className="removeItemModalRemoveButton"
              onClick={updateCart}
            >
              REMOVE
            </button>
            <button
              className="removeItemModalWishlistButton"
              onClick={addWishList}
            >
              MOVE TO WISHLIST
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={quantityModel}>
        <div className="ModalDiv">
          <div className="quantityItemModalCloseContainer">
            <p className="removeItemModalParaOne">Select Quantity</p>
            <AiOutlineClose
              className="modalCloseButton"
              onClick={() => setQuantityModel(false)}
            />
          </div>
          <div className="quantityModalListContainer">
            {quantityArray.map((eachQuantity) => (
              <p
                id={eachQuantity}
                className={
                  eachQuantity === selectQuantity
                    ? "selectedEachQuantityPara"
                    : "eachQuantityPara"
                }
                key={eachQuantity}
                onClick={() => setSelectQuantity(eachQuantity)}
              >
                {eachQuantity}
              </p>
            ))}
          </div>
          <div>
            <button
              className="modalDoneButton"
              disabled={selectQuantity === data.quantity}
              onClick={updateItem}
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EachCartItem;
