import store from "../app/store";

import { errorApi, unknownApi } from "../stateslices/apiErrorSlice";
import {
  loadingState,
  successState,
  failedState,
} from "../stateslices/pageStateSlice";

const server = process.env.REACT_APP_SERVER_URL;

export const getBrandsandCategories = async () => {
  store.dispatch(loadingState());
  const url = `${server}welcome/`;
  const options = {
    method: "GET",
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (response.status === 200) {
    store.dispatch(successState());
    return { status: response.status, data };
  } else if (response.status === 404) {
    store.dispatch(errorApi(data));
    store.dispatch(failedState());
  } else {
    store.dispatch(unknownApi());
    store.dispatch(failedState());
  }
};


export const getColorsAndBrands = async () => {
  const url = `${server}welcome/two`;
  const options = {
    method: "GET",
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (response.status === 200) {
    store.dispatch(successState());
    return { remainingStatus: response.status, remainingData  : data};
  } else if (response.status === 404) {
    store.dispatch(errorApi(data));
    store.dispatch(failedState());
  } else {
    store.dispatch(unknownApi());
    store.dispatch(failedState());
  }
};
