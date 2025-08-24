import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addToCart = createAsyncThunk(
  "/cart/add-to-cart",

  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:8003/api/cart/add-to-cart",
      { userId, productId, quantity }
    );
    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "/cart/fetch-cart-items",

  async ({ userId }) => {
    const response = await axios.get(
      `http://localhost:8003/api/cart/fetch-cart-items/${userId}`
    );
    return response.data;
  }
);

export const updateCartItems = createAsyncThunk(
  "/cart/update-cart-items",

  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:8003/api/cart/update-cart",
      { userId, productId, quantity }
    );
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "/cart/delete-cart-items",

  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:8003/api/cart/delete-cart-items/${userId}/${productId}`
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action?.payload?.data);
      })
      .addCase(addToCart.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action?.payload?.data);
      })
      .addCase(fetchCartItems.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(updateCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action?.payload?.data);
      })
      .addCase(updateCartItems.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action?.payload?.data);
      })
      .addCase(deleteCartItem.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = []);
      });
  },
});

export default shoppingCartSlice.reducer;
