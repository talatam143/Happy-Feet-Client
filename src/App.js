/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "./stateslices/filtersSlice";
import Cookies from "js-cookie";

import Home from "./components/Home/Home";
import Welcomepage from "./components/Welcomepage/Welcomepage";
import Wishlist from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import Products from "./components/Products/Products";
import { getBrandsandCategories } from "./api/welcomePage";
import { getWishList } from "./api/WishListApi";
import Login from "./components/Login/Login";
import ViewProduct from "./components/Products/ViewProduct";
import UpdateUser from "./components/Login/UpdateUser";
import SelectAddress from "./components/Cart/SelectAddress";
import Payment from "./components/Cart/Payment";
import SavedAddress from "./components/Profile/Saved Address/SavedAddress";
import SavedCards from "./components/Profile/SavedCards/SavedCards";
import OrderSuccessful from "./components/Orders/OrderSuccessful";
import { verifyUser } from "./api/Login";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const fetchFilters = useSelector((state) => state.filterState.haveFilters);

  useEffect(() => {
    if (location.pathname === "/products") {
      if (!fetchFilters) {
        getCategoriesAndBrands();
      }
    }
    let getNumber = Cookies.get("num");
    let getToken = Cookies.get("HappyT")
    if(getToken !== undefined){
      validateUser()
    }
    if (getNumber !== undefined) {
      fetchWishList();
    }
  }, [location]);

  const validateUser = async() =>{
    await verifyUser()
  }

  const fetchWishList = async () => {
    await getWishList();
  };

  const getCategoriesAndBrands = async () => {
    const { status, data } = await getBrandsandCategories();
    if (status === 200) {
      let categoriesNames = [];
      let brandNames = [];
      let colorsNames = [];
      data.categoriesList.map((eachCategory) =>
        categoriesNames.push(eachCategory.name)
      );
      data.brandsList.map((eachBrand) => brandNames.push(eachBrand.name));
      data.colorsList.map((eachColor) => colorsNames.push(eachColor));
      dispatch(setFilters({ categoriesNames, brandNames, colorsNames }));
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Welcomepage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart">
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/address" element={<SelectAddress />} />
          <Route path="/cart/payments" element={<Payment />} />
        </Route>
        <Route path="/account">
          <Route path="/account" element={<Profile />} />
          <Route path="myaddress" element={<SavedAddress />} />
          <Route path="mycards" element={<SavedCards />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ViewProduct />} />
      </Route>
      <Route path="ordersuccess" element={<OrderSuccessful/>}/>
      <Route path="/updateuser" element={<UpdateUser />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
