import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  addressData: [],
};

export const fetchAddress = createAsyncThunk(
  "/address/fetch",
  async ({ userId }) => {
    const res = await axios.get(
      `http://localhost:8003/api/address/fetch-address/${userId}`
    );
    return res?.data;
  }
);

export const editAddress = createAsyncThunk(
  "/address/edit",
  async ({ userId, addressId, formData }) => {
    const res = await axios.put(
      `http://localhost:8003/api/address/edit-address/${userId}/${addressId}`,
      { formData }
    );
    return res?.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/delete",
  async ({ userId, addressId }) => {
    const res = await axios.put(
      `http://localhost:8003/api/address/delete-address/${userId}/${addressId}`
    );
    return res?.data;
  }
);

export const addAddress = createAsyncThunk(
  "/address/add",
  async ({ formData, userId }) => {
    const res = await axios.post(
      `http://localhost:8003/api/address/add-address`,
      { ...formData, userId }
    );
    return res?.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        (state.isLoading = false), (state.addressData = action?.payload?.data);
      })
      .addCase(fetchAddress.rejected, (state) => {
        (state.isLoading = false), (state.addressData = []);
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        (state.isLoading = false), (state.addressData = action?.payload);
      })
      .addCase(editAddress.rejected, (state) => {
        (state.isLoading = false), (state.addressData = []);
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        (state.isLoading = false), (state.addressData = action?.payload);
      })
      .addCase(deleteAddress.rejected, (state) => {
        (state.isLoading = false), (state.addressData = []);
      })
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        (state.isLoading = false), (state.addressData = action?.payload);
      })
      .addCase(addAddress.rejected, (state) => {
        (state.isLoading = false), (state.addressData = []);
      });
  },
});

export default addressSlice.reducer;
