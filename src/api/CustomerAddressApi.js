import Cookies from "js-cookie";
import store from "../app/store";

import {
  loadingState,
  successState,
  failedState,
} from "../stateslices/pageStateSlice";

const server = process.env.REACT_APP_SERVER_URL;

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
  if (response.status === 200) {
    store.dispatch(successState());
  } else {
    store.dispatch(failedState());
  }
  const responseData = await response.json();
  return { status: response.status, data: responseData.address };
};
