import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Welcomepage from "./components/Welcomepage/Welcomepage";
import Wishlist from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import Products from "./components/Products/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Welcomepage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;
