import { createSlice } from "@reduxjs/toolkit";

export const pageStateSlice = createSlice({
  name: "theme",
  initialState: {
    initial: true,
    loading: false,
    success: false,
    failed: false,
  },
  reducers: {
    loadingState: (state) => {
      state.initial = false;
      state.loading = true;
      state.success = false;
      state.failed = false;
    },
    successState: (state) => {
      state.initial = false;
      state.loading = false;
      state.success = true;
      state.failed = false;
    },
    failedState: (state) => {
      state.initial = false;
      state.loading = false;
      state.success = false;
      state.failed = true;
    },
    initialState: (state) => {
      state.initial = true;
      state.loading = false;
      state.success = false;
      state.failed = false;
    },
  },
});

export const { loadingState, successState, failedState, initialState } =
  pageStateSlice.actions;

export default pageStateSlice.reducer;
