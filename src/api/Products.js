import store from "../app/store";

import { errorApi, unknownApi } from "../stateslices/apiErrorSlice";
import {
  loadingState,
  successState,
  failedState,
} from "../stateslices/pageStateSlice";

const server = process.env.REACT_APP_SERVER_URL;

export const getProducts = async (fitersList) => {
  store.dispatch(loadingState());
  const url = `${server}products/all?price=${fitersList.price}&gender=${fitersList.gender}&color=${fitersList.color}&brand=${fitersList.brand}&cateory=${fitersList.category}`;
  const options = {
    method: "GET",
  };
  const response = await fetch(url, options);
  const responsedata = await response.json();
  if (response.status === 200) {
    store.dispatch(successState());
    return { status: response.status, productData: responsedata.products };
  } else if (response.status === 404) {
    store.dispatch(errorApi(responsedata));
    store.dispatch(failedState());
  } else {
    store.dispatch(unknownApi());
    store.dispatch(failedState());
  }
};
