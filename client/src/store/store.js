import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/auth-slice.js";
import adminProductsSlice from "./admin/productSlice/productSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
  },
});

export default store;
