import { configureStore } from "@reduxjs/toolkit";
import apiErrorReducer from "../stateslices/apiErrorSlice";
import pageStateReducer from "../stateslices/pageStateSlice";
import filtersReducer from "../stateslices/filtersSlice";
import userReducer from "../stateslices/userSlice";
import cartReducer from "../stateslices/cartStateSlice";

export default configureStore({
  reducer: {
    apiError: apiErrorReducer,
    pageState: pageStateReducer,
    filterState: filtersReducer,
    userState: userReducer,
    cartState: cartReducer,
  },
});
