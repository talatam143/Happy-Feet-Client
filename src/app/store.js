import { configureStore } from '@reduxjs/toolkit';
import apiErrorReducer from "../stateslices/apiErrorSlice";
import pageStateReducer from "../stateslices/pageStateSlice";
import filtersReducer from "../stateslices/filtersSlice";
 
export default configureStore({
  reducer: {
    apiError : apiErrorReducer,
    pageState : pageStateReducer,
    filterState : filtersReducer
  },
});
