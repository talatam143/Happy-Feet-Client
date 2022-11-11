/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  CouponIcon,
  OrderBox,
  RightIcon,
  UserIcon,
  WishlistIcon,
} from "../SVG/svgrepo";
import Cookies from "js-cookie";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";
import { getAccount } from "../../api/Login";
import { removeUser } from "../../stateslices/userSlice";

function Profile() {
  const navigate = useNavigate();
  const pageState = useSelector((state) => state.pageState);
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();

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
    navigate("/");
  };

  return (
    <>
      <div>
        {pageState.success && (
          <>
            <p className="accountHeading">My Account</p>
            <div className="accountDetailsContainer">
              {userDetails.name !== undefined ? (
                <p className="accountDetailsUserIcon">
                  {userDetails.name.split(" ")[0][0] +
                    userDetails.name.split(" ")[1][0]}
                </p>
              ) : (
                <p className="accountDetailsUserNoIcon">
                  <UserIcon color="#ff8ba7" size="40" />
                </p>
              )}
              <div className="profileUserDetailsContainer">
                {userDetails.name !== undefined && (
                  <p className="accountDetailsNameParas">{userDetails.name}</p>
                )}
                {userDetails.email !== undefined && (
                  <p className="accountDetailsParas">{userDetails.email}</p>
                )}
                {userDetails.mobileNumber !== undefined && (
                  <p className="accountDetailsParas">
                    +91 {userDetails.mobileNumber}
                  </p>
                )}
                <Link to="/updateuser" className="profileEditLink">
                  Edit
                </Link>
              </div>
            </div>
            <div className="accountSpecialButtonContainer">
              <button
                className="accountSpecialButton"
                onClick={() => navigate("/wishlist")}
              >
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
              <Link className="accountButtonLinks" to="mycards">
                <button className="accountNormalButton">
                  Saved Payments <RightIcon />
                </button>
              </Link>
              <hr className="accountNormalButtonHr" />
              <Link className="accountButtonLinks" to="myaddress">
                <button className="accountNormalButton">
                  Address Book <RightIcon />
                </button>
              </Link>
              <hr className="accountNormalButtonHr" />
            </div>
            <div className="profileLogoutButtonContainer">
              <button className="profileLogoutButton" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Profile;
