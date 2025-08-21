import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  shopProductList: [],
};

export const fetchAllUserProducts = createAsyncThunk(
  "/user/fetch-product",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const res = await axios.get(
      `http://localhost:8003/api/shop/products/get-filtered-products?${query}`,
      {
        withCredentials: true,
      }
    );
    return res?.data;
  }
);

const shopProductsSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUserProducts.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.shopProductList = action?.payload?.data);
      })
      .addCase(fetchAllUserProducts.rejected, (state) => {
        (state.isLoading = false), (state.shopProductList = []);
      });
  },
});

export default shopProductsSlice.reducer;
