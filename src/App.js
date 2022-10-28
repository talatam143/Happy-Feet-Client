/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "./stateslices/filtersSlice";

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

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const fetchFilters = useSelector((state) => state.filterState.haveFilters);
  const user = useSelector((state) => state.userState);

  useEffect(() => {
    if (location.pathname === "/products") {
      if (!fetchFilters) {
        getCategoriesAndBrands();
      }
    }
    if (user.isLoggedIn && !user.fetchedWishList) {
      fetchWishList()
    }
  }, [location]);

  const fetchWishList = async() =>{
    await getWishList();
  }


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
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ViewProduct />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
