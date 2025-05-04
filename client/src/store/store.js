import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/auth-slice.js";
import adminProductsSlice from "./admin/productSlice/productSlice.js";
import shoppingProductsSlice from "./shop/shop-slice.js";
import shopCartSlice from "./cart-slice/cart-slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shoppingProductsSlice,
    shoppingCart: shopCartSlice,
  },
});

export default store;
