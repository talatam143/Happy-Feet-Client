import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    haveFilters : false,
    categories:[],
    brands:[],
    colors:[]
  },
  reducers: {
    setFilters: (state,data) => {
      state.haveFilters = true
      state.categories = data.payload.categoriesNames
      state.brands = data.payload.brandNames
      state.colors = data.payload.colorsNames
    },
  },
});

export const { setFilters} = filtersSlice.actions;

export default filtersSlice.reducer;
