import { createSlice } from "@reduxjs/toolkit";

export const cartStateSlice = createSlice({
  name: "theme",
  initialState: {
    isCartInitialized: false,
    isAddressInitialized: false,
    isPaymentDone: false,
    isOrderSuccess: false,
    cartItems: [],
    cartAddress: {},
    cartPayment: {},
    cartPriceData: { Discount: 0, price: 0, convenienceFee: 0, couponId: "" },
  },
  reducers: {
    addCartItems: (state, payload) => {
      state.isCartInitialized = payload.payload.status;
      state.cartItems = payload.payload.data;
    },
    addCartAddress: (state, payload) => {
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
    resetPayment: (state) => {
      state.isPaymentDone = false;
      state.cartPayment = {};
    },
    setOrderData: (state) => {
      state.isOrderSuccess = true;
    },
    resetCart: (state) => {
      state.isCartInitialized = false;
      state.isAddressInitialized = false;
      state.isPaymentDone = false;
      state.isOrderSuccess = false;
    },
  },
});

export const {
  addCartItems,
  addCartAddress,
  setCartPrice,
  setCartPayment,
  resetCart,
  resetPayment,
  setOrderData,
} = cartStateSlice.actions;

export default cartStateSlice.reducer;
