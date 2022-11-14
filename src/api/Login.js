import Cookies from "js-cookie";
import store from "../app/store";
import {
  loadingState,
  successState,
  failedState,
} from "../stateslices/pageStateSlice";
import { setUser,removeUser } from "../stateslices/userSlice";

const server = process.env.REACT_APP_SERVER_URL;

export const sendOtp = async (data) => {
  const url = `${server}auth/sendotp/`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  return { responseData, status: response.status };
};

export const verifyOtp = async (data) => {
  const url = `${server}auth/otp/`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (response.status === 200) {
    store.dispatch(setUser(responseData));
    return { responseData, status: response.status };
  } else {
    return { responseData, status: response.status };
  }
};

export const getAccount = async () => {
  store.dispatch(loadingState());
  let token = Cookies.get("HappyT");
  const url = `${server}auth/getaccount/${token}`;
  const options = {
    method: "GET",
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (response.status === 200) {
    store.dispatch(successState());
    return { responseData, status: response.status };
  } else {
    store.dispatch(failedState());
    return { responseData, status: response.status };
  }
};

export const updateUserAccount = async (data) => {
  let token = Cookies.get("HappyT");
  const url = `${server}auth/updateUser/`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (response.status === 200) {
    store.dispatch(successState());
    return { responseData, status: response.status };
  } else {
    store.dispatch(failedState());
    return { responseData, status: response.status };
  }
};

export const verifyUser = async () => {
  let token = Cookies.get("HappyT");
  const url = `${server}/verifyuser/`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url,options)
  if(response.status !==200){
    store.dispatch(removeUser())
  }
};
