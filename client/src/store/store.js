import authReducer from "./auth/auth-slice";
import { configureStore } from "@reduxjs/toolkit";
import adminProductsSlice from "./admin/product-slice.js";
import shopProductsSlice from "./shop/shop.slice.js";
import shoppingCartSlice from "./cart/cart.slice.js";
import addressSlice from "./address/address-slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressSlice,
    shoppingCart: shoppingCartSlice,
    userProducts: shopProductsSlice,
    adminProducts: adminProductsSlice,
  },
});

export default store;
