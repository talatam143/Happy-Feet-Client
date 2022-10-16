import React from "react";
import { useLocation } from "react-router-dom";

import "./Navbar.css";
import { HomeIcon, CartIcon, WishlistIcon, UserIcon } from "../SVG/svgrepo";
import { Link } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <div className="navbarContainer">
      <Link to="/">
        <button className="navbarButtons">
          <HomeIcon color={location.pathname === "/" ? "#e53170" : "#594a4e"} />
        </button>
      </Link>
      <Link to="/wishlist">
        <button className="navbarButtons">
          <WishlistIcon color={location.pathname === "/wishlist" ? "#e53170" : "#594a4e"} />
        </button>
      </Link>
      <Link to="/cart">
        <button className="navbarButtons">
          <CartIcon color={location.pathname === "/cart" ? "#e53170" : "#594a4e"} />
        </button>
      </Link>
      <Link to="/account">
        <button className="navbarButtons">
          <UserIcon color={location.pathname === "/account" ? "#e53170" : "#594a4e"} />
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
