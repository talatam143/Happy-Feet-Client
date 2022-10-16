import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../stateslices/counterSlice';
import apiErrorReducer from "../stateslices/apiErrorSlice";
import pageStateReducer from "../stateslices/pageStateSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    apiError : apiErrorReducer,
    pageState : pageStateReducer
  },
});
