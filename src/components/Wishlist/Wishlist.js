import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { getWishListProducts } from "../../api/WishListApi";
import EachProduct from "./EachProduct"
import heart from "../../images/heart.png";
import "./Wishlist.css";

function Wishlist() {
  const [whishListItems, setWishListItems] = useState([]);
  const pageState = useSelector((state) => state.pageState)
  const navigate = useNavigate()


  useEffect(() => {
    let isLoggedIn = Cookies.get("HappyT");
    if (isLoggedIn === undefined) {
      navigate("/login");
    } else {
      fetchWishListProducts();
    }
  }, []);

  useEffect(() =>{
    fetchWishListProducts()
  },[])

  const fetchWishListProducts = async() =>{
    const {status, responseData} = await getWishListProducts();
    if(status === 200) {
      setWishListItems(responseData.getWishListProducts)
    }
  }

  return (
    <div>
    {pageState.success ?
    <>
      <div className="wishListHeadingContainer">
        <p className="wishListHeadingPara">Wishlist</p>
        {whishListItems.length > 0 ?
        <p className="wishListCountPara">{whishListItems.length} products</p>
        :
        null}
      </div>
      {whishListItems.length > 0 ? (
        <div className="wishListProductsContainer">
            {whishListItems.map((eachProduct) => (
              <EachProduct key={eachProduct._id} data={eachProduct} fetchWishListProducts={fetchWishListProducts} />
            ))}
          </div>
      ) : (
        <div className="wishListNoItemsContainer">
          <div className="wishListNoItemsDataContainer">
            <img src={heart} alt="wishlist icon" width="84px" />
            <p className="wishListNoItemsDataContainerPara">Your wishlist is empty</p>
            <p className="wishListNoItemsDataContainerMiniPara">Hang your wishes where you can make them come true.</p>
          </div>
          <button className="wishListContinueButton" onClick={() => navigate("/products")}>Continue Shopping</button>
        </div>
      )}
      </>
      :
      null
      }
    </div>
  );
}

export default Wishlist;
