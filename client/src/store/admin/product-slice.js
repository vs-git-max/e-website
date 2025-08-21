import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/add-new-product",
  async (formData) => {
    const res = await axios.post(
      "http://localhost:8003/api/admin/products/add-new-product",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetch-all-products",
  async () => {
    const res = await axios.get(
      "http://localhost:8003/api/admin/products/fetch-all-products"
    );
    return res?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/edit-product",
  async ({ id, formData }) => {
    const res = await axios.put(
      `http://localhost:8003/api/admin/products/edit-product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete-product",
  async ({ id }) => {
    const res = await axios.delete(
      `http://localhost:8003/api/admin/products/delete-product/${id}`
    );

    return res?.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productList = action.payload?.data);
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        (state.isLoading = false), (state.productList = []);
      });
  },
});

export default adminProductSlice.reducer;
