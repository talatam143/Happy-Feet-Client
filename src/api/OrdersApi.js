import Cookies from "js-cookie";
import store from "../app/store";

import { loadingState } from "../stateslices/pageStateSlice";
const server = process.env.REACT_APP_SERVER_URL;

export const placeOrder = async (data) => {
  store.dispatch(loadingState());
  let token = Cookies.get("HappyT");
  const url = `${server}order/placeorder/`;
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

export const getMyOrders = async () => {
  store.dispatch(loadingState());
  let token = Cookies.get("HappyT");
  let number = Cookies.get("num");
  const url = `${server}order/myorders/${number}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  return { status: response.status, data: responseData };
};

export const getSingleOrder = async (filter) => {
  store.dispatch(loadingState());
  let token = Cookies.get("HappyT");
  const url = `${server}order/mysingleorder/${filter}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const responseData = await response.json();
  return { status: response.status, data: responseData };
};
