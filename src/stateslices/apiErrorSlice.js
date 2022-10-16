import { createSlice } from "@reduxjs/toolkit";

export const apiErrorSlice = createSlice({
  name: "user",
  initialState: {
    showError: false,
    errorState: false,
    message: "",
  },
  reducers: {
    errorApi: (state,data) => {
      state.showError = true
      state.errorState = true
      state.message = data.payload.error
    },
    successApi : (state,data)=> {
      state.showError = true
      state.errorState = false
      state.message = data.payload.message
    },
    resetAPi : (state) =>{
        state.showError = false
    },
    unknownApi : (state) => {
      state.showError = true
      state.errorState = true
      state.message = "Something went Wrong"
    }
  },
});

export const { errorApi,successApi,resetAPi ,unknownApi} = apiErrorSlice.actions;

export default apiErrorSlice.reducer;
