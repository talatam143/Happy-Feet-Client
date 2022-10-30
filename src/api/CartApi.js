import Cookies from "js-cookie";
import store from "../app/store";

import {
  loadingState,
  successState,
  failedState,
} from "../stateslices/pageStateSlice";

const server = process.env.REACT_APP_SERVER_URL;

export const getCartItems = async () => {
  store.dispatch(loadingState());
  let token = Cookies.get("HappyT");
  let number = Cookies.get("num");
  const url = `${server}cart/${number}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  if (response.status === 200 || response.status === 202) {
    store.dispatch(successState());
  } else {
    store.dispatch(failedState());
  }
  return { responseData, status: response.status };
};

export const addToCart = async (data) => {
  store.dispatch(loadingState());
  let token = Cookies.get("HappyT");
  const url = `${server}cart/add`;
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
  } else {
    store.dispatch(failedState());
  }
  return { responseData, status: response.status };
};

export const removeFromCart = async (data) => {
  store.dispatch(loadingState());
  let token = Cookies.get("HappyT");
  const url = `${server}cart/remove`;
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
  } else {
    store.dispatch(failedState());
  }
  return { responseData, status: response.status };
};

export const updateQuantity = async (data) => {
  store.dispatch(loadingState());
  let token = Cookies.get("HappyT");
  const url = `${server}cart/update`;
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
  } else {
    store.dispatch(failedState());
  }
  return { responseData, status: response.status };
};
