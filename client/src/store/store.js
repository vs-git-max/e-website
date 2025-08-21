import authReducer from "./auth/auth-slice";
import { configureStore } from "@reduxjs/toolkit";
import adminProductsSlice from "./admin/product-slice.js";
import shopProductsSlice from "./shop/shop.slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    userProducts: shopProductsSlice,
  },
});

export default store;
