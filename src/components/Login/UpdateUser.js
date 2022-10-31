/* eslint-disable no-useless-computed-key */
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

import { getAccount, updateUserAccount } from "../../api/Login";
import "./UpdateUser.css";
import logo from "../../images/darklogo.png";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: Cookies.get("num"),
  dateOfBirth: "",
  gender: "Male",
};

function UpdateUser() {
  const [userData, setUserData] = useState(initialFormData);
  const [formError, setFormError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = Cookies.get("HappyT");
    if (isLoggedIn === undefined) {
      navigate("/login");
    } else {
      fetchUserAccount();
    }
  }, []);

  const fetchUserAccount = async () => {
    const { status, responseData } = await getAccount();
    if (status === 200) {
      setUserData({ ...userData, ["mobileNumber"]: Cookies.get("num") });
      let fetchedData = responseData.findAccount[0];
      let name = fetchedData.name.split(" ");
      fetchedData.email !== undefined &&
        setUserData((userData.email = fetchedData.email));
      name.length > 0 && setUserData((userData.firstName = name[0]));
      name.length > 1 && setUserData((userData.lastName = name[1]));
      fetchedData.dateOfBirth !== undefined &&
        setUserData({
          ...userData,
          ["dateOfBirth"]: moment(fetchedData.dateOfBirth).format("YYYY-MM-DD"),
        });
    }
  };

  const handleFormChange = (e) => {
    if (e.target.name === "gender") {
      if (e.target.checked) {
        setUserData({ ...userData, [e.target.name]: "Female" });
      } else {
        setUserData({ ...userData, [e.target.name]: "Male" });
      }
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    let data = {
      name: userData.firstName + " " + userData.lastName,
      email: userData.email,
      mobileNumber: userData.mobileNumber,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
    };
    const { status, responseData } = await updateUserAccount(data);
    if (status === 200) {
      navigate(-1);
    } else if (status === 404) {
      setFormError(true);
      setFormErrorMessage(responseData.error);
    }
  };

  return (
    <div className="updateUserContainer">
      <div className="updateUserWelcomeContainer">
        <img
          src={logo}
          alt="brand-logo"
          className="updateUserContainerBrandLogo"
        />
        <p className="updateUserBrandSub">Feel You'r Step</p>
        <p className="updateUserHeading">Update Profile</p>
      </div>
      <form className="updateUserFormContainer" onSubmit={handleUpdateUser}>
        <div className="form__group field">
          <input
            name="firstName"
            placeholder="Name"
            className="form__field"
            type="text"
            id="firstNameId"
            value={userData.firstName}
            onChange={handleFormChange}
            required
          />
          <label className="form__label" htmlFor="firstNameId">
            First Name
          </label>
        </div>
        <div className="form__group field">
          <input
            name="lastName"
            placeholder="Name"
            className="form__field"
            type="text"
            id="secondNameId"
            value={userData.lastName}
            onChange={handleFormChange}
          />
          <label className="form__label" htmlFor="secondNameId">
            Last Name
          </label>
        </div>
        <div className="form__group field">
          <input
            name="email"
            placeholder="Name"
            className="form__field"
            type="email"
            id="emailId"
            required
            value={userData.email}
            onChange={handleFormChange}
          />
          <label className="form__label" htmlFor="emailId">
            Email
          </label>
        </div>
        <div className="form__group field">
          <input
            name="mobileNumber"
            placeholder="Name"
            className="form__field"
            type="number"
            id="mobileNumberId"
            value={userData.mobileNumber}
            onChange={handleFormChange}
            disabled
          />
          <label className="form__label" htmlFor="mobileNumberId">
            Mobile Number
          </label>
        </div>
        <label className="dobLabel" htmlFor="genderid">
          Gender
        </label>
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleFormChange}
            id="genderid"
            name="gender"
          />
          <span className="slider"></span>
        </label>
        <label htmlFor="dobInputId" className="dobLabel">
          Date Of Birth
        </label>
        <input
          type="date"
          name="dateOfBirth"
          className="dobInput"
          placeholder="Date"
          id="dobInputId"
          value={userData.dateOfBirth}
          onChange={handleFormChange}
          required
        />
        <div className="updateProfileButtonsContainer">
          <button
            className="updateProfileSkipButton"
            type="button"
            onClick={() => navigate(-1)}
          >
            Skip
          </button>
          <button className="updateProfileUpdateButton" type="submit">
            Update
          </button>
        </div>
        {formError && (
          <p className="updateUserFormErrorPara">* {formErrorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default UpdateUser;
