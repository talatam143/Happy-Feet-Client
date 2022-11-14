import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { MdOutlineClose } from "react-icons/md";

import "./Login.css";
import logo from "../../images/darklogo.png";
import { sendOtp, verifyOtp } from "../../api/Login";
import { useNavigate } from "react-router-dom";

const inputList = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];

function Login() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpInputs, setOtpInputs] = useState({
    First: "",
    Second: "",
    Third: "",
    Fourth: "",
    Fifth: "",
    Sixth: "",
  });
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarState, setSnackBarState] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = Cookies.get("HappyT");
    if (isLoggedIn !== undefined) {
      navigate(-1);
    }
  });

  const handleOtpChange = (e) => {
    let { name, value, maxLength } = e.target;
    if (value.length <= maxLength) {
      setOtpInputs({ ...otpInputs, [e.target.name]: e.target.value });
    }
    if (value.length >= maxLength) {
      const nextSibling = document.querySelector(
        `input[name=${inputList[inputList.indexOf(name) + 1]}]`
      );
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    } else if (value.length <= maxLength) {
      const nextSibling = document.querySelector(
        `input[name=${inputList[inputList.indexOf(name) - 1]}]`
      );
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
  };

  const deliverOtp = async () => {
    let data = { number: mobileNumber };
    setIsLoading(true);
    let { status, responseData } = await sendOtp(data);
    if (status === 200) {
      setIsLoading(false);
      setFormState(true);
      setSnackBarState(true);
      setShowSnackBar(true);
      setSnackBarMessage(responseData.message);
    } else {
      setIsLoading(false);
      setSnackBarState(false);
      setShowSnackBar(true);
      setSnackBarMessage("Something went wrong. Try again");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formState) {
      if (mobileNumber.length === 10) {
        deliverOtp();
      } else {
        setError(true);
      }
    } else {
      let otp =
        otpInputs.First +
        otpInputs.Second +
        otpInputs.Third +
        otpInputs.Fourth +
        otpInputs.Fifth +
        otpInputs.Sixth;
      let data = { number: mobileNumber, otp: otp };
      setIsLoading(true);
      let { status, responseData } = await verifyOtp(data);
      if (status === 200) {
        if (responseData.userStatus === false) {
          navigate("/updateuser");
        } else {
          navigate(-1);
        }
      } else if (status === 404) {
        setIsLoading(false);
        setSnackBarState(false);
        setShowSnackBar(true);
        setSnackBarMessage(responseData.error);
      } else {
        setIsLoading(false);
        setSnackBarState(false);
        setShowSnackBar(true);
        setSnackBarMessage("Something went wrong. Try again");
      }
    }
  };

  return (
    <div className="loginContainer">
      <button
        className="loginContainerCloseButton"
        onClick={() => navigate("/")}
      >
        <MdOutlineClose className="loginContainerCloseIcon" />
      </button>
      <div className="loginWelcomeContainer">
        <img src={logo} alt="brand-logo" className="loginContainerBrandLogo" />
        <p className="loginBrandSub">Feel You'r Step</p>
        <p className="loginHeading">
          Welcome to <span className="loginHappySpan">Happy</span>
          <span className="loginFeetSpan">Feet</span>
        </p>
      </div>
      <div className="loginFormContainer">
        {!formState ? (
          <>
            <p className="LoginMobilePara">Enter your mobile number</p>
            <div className="loginNumberInputContainer">
              <p className="loginCountryCodePara">+91</p>
              <hr className="loginNumberContainerHr" />
              <TextField
                label="Mobile number"
                variant="outlined"
                type="number"
                size="small"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  setError(false);
                }}
                required
                sx={{
                  input: { color: "#33272a", fontSize: 19, fontWeight: 500 },
                  label: { color: "#33272a" },
                  margin: "10px 0 5px 0",
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#33272a",
                      borderWidth: 0,
                    },
                    "&:hover fieldset": {
                      borderColor: "#33272a",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#e53170",
                      label: { color: "#e53170" },
                      borderWidth: 0,
                    },
                  },
                }}
              />
            </div>
            {error && (
              <p className="LoginErrorPara">
                Enter 10 digit valid mobile number
              </p>
            )}
            <p className="loginTermsPara">
              By continuing, you agree to our{" "}
              <span className="loginTermsSpan">Terms of Use</span> and{" "}
              <span className="loginTermsSpan">Privacy Policy</span>
            </p>
            <button
              className="loginFormButton"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  thickness={6}
                  size={22}
                  sx={{ color: "#ffc6c7" }}
                />
              ) : (
                "Continue"
              )}
            </button>
          </>
        ) : (
          <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            transition={{ ease: "linear", duration: 0.4, type: "spring" }}
          >
            <form className="loginOtpSUbContainer" onSubmit={handleLogin}>
              <p className="LoginMobilePara">Enter 6 digit OTP</p>
              <div className="loginOtpNumberEditContainer">
                <p className="loginOTPNumberPara">OTP sent to {mobileNumber}</p>
                <button
                  className="editNumberButton"
                  onClick={() => setFormState(false)}
                  type="button"
                >
                  Edit
                </button>
              </div>
              <div className="loginOtpInputsContainer">
                {inputList.map((eachInput) => (
                  <input
                    type="number"
                    value={otpInputs[eachInput]}
                    name={eachInput}
                    key={eachInput}
                    className="loginOtpInput"
                    autoFocus={eachInput === "First"}
                    onChange={handleOtpChange}
                    maxLength={1}
                    required
                  />
                ))}
              </div>
              <button
                className="resendOtpButton"
                type="button"
                onClick={deliverOtp}
              >
                Resend OTP
              </button>
              <button className="loginFormSubmitButton" type="submit">
                {isLoading ? (
                  <CircularProgress
                    thickness={6}
                    size={22}
                    sx={{ color: "#ffc6c7" }}
                  />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </motion.div>
        )}
      </div>

      <Snackbar
        open={showSnackBar}
        autoHideDuration={3000}
        onClose={() => setShowSnackBar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setShowSnackBar(false)}
          severity={snackBarState ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Login;
