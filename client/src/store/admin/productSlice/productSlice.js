import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

//new product
export const newProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const res = await axios.post(
      "http://localhost:8003/api/admin/products/add",
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

//delete product
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const res = await axios.delete(
      `http://localhost:8003/api/admin/products/delete/${id}`
    );
    return res?.data;
  }
);

//editing products
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async (id, formData) => {
    const res = await axios.put(
      `http://localhost:8003/api/admin/products/edit/${id}`,
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

//fetching all products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async () => {
    const res = await axios.get("http://localhost:8003/api/admin/products/get");
    return res?.data;
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductsSlice.reducer;
