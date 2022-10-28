import Cookies from "js-cookie";
import store from "../app/store";
import { setWishList } from "../stateslices/userSlice";

import {
  loadingState,
  successState,
  failedState,
} from "../stateslices/pageStateSlice";

const server = process.env.REACT_APP_SERVER_URL;

export const addToWishList = async (data) => {
  let token = Cookies.get("HappyT");
  const url = `${server}wishlist/add/`;
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
  if(response.status === 200){
    getWishList();
  }
  return { responseData, status: response.status };
};

export const removeFromWishList = async (data) => {
  let token = Cookies.get("HappyT");
  const url = `${server}wishlist/remove/`;
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
  if(response.status === 200){
    getWishList();
  }
  return { responseData, status: response.status };
};

export const getWishList = async () => {
  let token = Cookies.get("HappyT");
  let number = Cookies.get("num");
  const url = `${server}wishlist/${number}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  if(response.status === 200){
    const responseData = await response.json();
    store.dispatch(setWishList(responseData));
  }
};

export const getWishListProducts = async() =>{
  store.dispatch(loadingState());
  let token = Cookies.get("HappyT");
  let number = Cookies.get("num");
  const url = `${server}wishlist/products/${number}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  if(response.status === 200){
    store.dispatch(successState());
    const responseData = await response.json();
    return { responseData, status: response.status };
  } else{
    store.dispatch(failedState());
  }
}