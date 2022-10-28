import React, { useEffect, useState } from "react";
import {
  CouponIcon,
  OrderBox,
  RightIcon,
  UserIcon,
  WishlistIcon,
} from "../SVG/svgrepo";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";
import { getAccount } from "../../api/Login";
import {removeUser} from "../../stateslices/userSlice";

function Profile() {
  const navigate = useNavigate();
  const pageState = useSelector((state) => state.pageState);
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch()

  useEffect(() => {
    let isLoggedIn = Cookies.get("HappyT");
    if (isLoggedIn === undefined) {
      navigate("/login");
    } else {
      fetchAccount();
    }
  }, []);

  const fetchAccount = async () => {
    let { responseData, status } = await getAccount();
    if (status === 200) {
      setUserDetails(responseData.findAccount[0]);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/")
  };

  return (
    <div>
    {pageState.success && 
    <>
      <p className="accountHeading">My Account</p>
      <div className="accountDetailsContainer">
        {userDetails.name ? (
          <p className="accountDetailsUserIcon">
            {userDetails.name.split(" ")}
          </p>
        ) : (
          <p className="accountDetailsUserNoIcon">
            <UserIcon color="#ff8ba7" size="40" />
          </p>
        )}
        <div>
          {userDetails.name && (
            <p className="accountDetailsNameParas">{userDetails.name}</p>
          )}
          {userDetails.email && (
            <p className="accountDetailsParas">{userDetails.email}</p>
          )}
          {userDetails.mobileNumber && (
            <p className="accountDetailsParas">
              +91 {userDetails.mobileNumber}
            </p>
          )}
        </div>
      </div>
      <div className="accountSpecialButtonContainer">
        <button className="accountSpecialButton">
          <WishlistIcon color="#ff8ba7" size="40" /> My Wishlist{" "}
        </button>
        <button className="accountSpecialButton">
          <OrderBox color="#ff8ba7" size="40" /> Orders
        </button>
        <button className="accountSpecialButton">
          <CouponIcon color="#ff8ba7" size="40" /> Coupons
        </button>
      </div>
      <div className="accountNormalButtonContainer">
        <hr className="accountNormalButtonHr" />
        <button className="accountNormalButton">
          Saved Payments <RightIcon />
        </button>
        <hr className="accountNormalButtonHr" />
        <button className="accountNormalButton">
          Address Book <RightIcon />
        </button>
        <hr className="accountNormalButtonHr"/>
      </div>
      <div className="profileLogoutButtonContainer">
        <button className="profileLogoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
      </>
    }
    </div>
  );
}

export default Profile;
