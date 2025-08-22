import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  shopProductList: [],
  productDetails: null,
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
export const fetchProductDetails = createAsyncThunk(
  "/user/fetch-product-details",
  async (id) => {
    const res = await axios.get(
      `http://localhost:8003/api/shop/products/get-product-details/${id}`,
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
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.productDetails = action?.payload?.data);
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        (state.isLoading = false), (state.productDetails = null);
      });
  },
});

export default shopProductsSlice.reducer;
