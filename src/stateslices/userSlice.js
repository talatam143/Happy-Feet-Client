import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

let getNumber = Cookies.get("num");

export const userStateSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: getNumber === undefined ? false : true,
    number: getNumber === undefined ? "" : getNumber,
    wishlist: [],
    fetchedWishList:false
  },
  reducers: {
    setUser: (state, payload) => {
      state.isLoggedIn = true;
      state.number = payload.payload.number;
      Cookies.set("HappyT", payload.payload.token, { expires: 365 });
      Cookies.set("num", payload.payload.number, { expires: 365 });
    },
    removeUser: (state) => {
      state.isLoggedIn = false;
      state.number = "";
      state.wishlist=[];
      state.fetchedWishList=false;
      Cookies.remove("HappyT");
      Cookies.remove("num");
    },
    setWishList: (state, payload) => {
      state.fetchedWishList = true;
      state.wishlist = payload.payload.wishlist.wishlist;
    },
  },
});

export const { setUser, removeUser, setWishList } = userStateSlice.actions;

export default userStateSlice.reducer;
