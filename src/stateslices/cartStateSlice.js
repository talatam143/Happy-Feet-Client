import { createSlice } from "@reduxjs/toolkit";

export const cartStateSlice = createSlice({
  name: "theme",
  initialState: {
    isCartInitialized: false,
    isAddressInitialized: false,
    isPaymentDone: false,
    cartItems: [],
    cartAddress: {},
    cartPayment: {},
    cartPriceData: { Discount: 0, price: 0, convenienceFee: 0 },
  },
  reducers: {
    addCartItems: (state, payload) => {
      state.isCartInitialized = payload.payload.status;
      state.cartItems = payload.payload.data;
    },
    addCartAddress: (state, payload) => {
      console.log(payload)
      state.isAddressInitialized = true;
      state.cartAddress = payload.payload;
    },
    setCartPrice: (state, payload) => {
      state.cartPriceData = payload.payload.data;
    },
    setCartPayment: (state, payload) => {
      state.isPaymentDone = true;
      state.cartPayment = payload.payload;
    },
    resetCart: (state) => {
      state.isCartInitialized = false;
      state.isAddressInitialized = false;
      state.isPaymentDone = false;
      state.cartItems = [];
      state.cartAddress = {};
      state.cartPayment = {};
      state.cartPriceData = { Discount: 0, price: 0, convenienceFee: 0 };
    },
  },
});

export const {
  addCartItems,
  addCartAddress,
  setCartPrice,
  setCartPayment,
  resetCart,
} = cartStateSlice.actions;

export default cartStateSlice.reducer;
