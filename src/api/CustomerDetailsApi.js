import Cookies from "js-cookie";
import store from "../app/store";

import { successState, failedState } from "../stateslices/pageStateSlice";

const server = process.env.REACT_APP_SERVER_URL;

export const addAddress = async (data) => {
  let token = Cookies.get("HappyT");
  const url = `${server}details/address/add`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  if (response.status === 200 || response.status === 404) {
    store.dispatch(successState());
  } else {
    store.dispatch(failedState());
  }
  const responseData = await response.json();
  return { status: response.status, data: responseData };
};

export const addCard = async (data) => {
  let token = Cookies.get("HappyT");
  const url = `${server}details/cards/add`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  if (response.status === 200 || response.status === 404) {
    store.dispatch(successState());
  } else {
    store.dispatch(failedState());
  }
  const responseData = await response.json();
  return { status: response.status, data: responseData };
};

export const removeAddress = async (data) => {
  let token = Cookies.get("HappyT");
  const url = `${server}details/address/delete`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  if (response.status === 200) {
    store.dispatch(successState());
  } else {
    store.dispatch(failedState());
  }
  const responseData = await response.json();
  return { status: response.status, data: responseData };
};

export const removeCard = async (data) => {
  let token = Cookies.get("HappyT");
  const url = `${server}details/card/delete`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  if (response.status === 200) {
    store.dispatch(successState());
  } else {
    store.dispatch(failedState());
  }
  const responseData = await response.json();
  return { status: response.status, data: responseData };
};

export const getAddress = async () => {
  let token = Cookies.get("HappyT");
  let number = Cookies.get("num");
  const url = `${server}details/address/${number}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  if (response.status === 200 || response.status === 404) {
    store.dispatch(successState());
  } else {
    store.dispatch(failedState());
  }
  const responseData = await response.json();
  return { status: response.status, data: responseData };
};

export const getPayments = async () => {
  let token = Cookies.get("HappyT");
  let number = Cookies.get("num");
  const url = `${server}details/cards/${number}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  if (response.status === 200 || response.status === 404) {
    store.dispatch(successState());
  } else {
    store.dispatch(failedState());
  }
  const responseData = await response.json();
  return { status: response.status, data: responseData };
};

export const verifyCvv = async (data) => {
  let token = Cookies.get("HappyT");
  const url = `${server}details/cards/auth`;
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
  return { status: response.status, data: responseData };
};
