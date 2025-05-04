import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//inital state
const initialState = {
  cartItems: [],
  isLoading: false,
};

//add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const res = await axios.post("http://localhost:3000/api/shop/cart/add", {
      userId,
      productId,
      quantity,
    });
    return res?.data;
  }
);

//update cart
export const updateCartProduct = createAsyncThunk(
  "cart/updateCartProduct",
  async ({ userId, productId, quantity }) => {
    const res = await axios.put(
      "http://localhost:3000/api/shop/cart/update-cart",
      {
        userId,
        productId,
        quantity,
      }
    );
    return res?.data;
  }
);

//delete cart
export const deleteCartProduct = createAsyncThunk(
  "cart/deleteCartProduct",
  async ({ userId, productId }) => {
    const res = await axios.delete(
      `http://localhost:3000/api/shop/cart/${userId}/${productId}`
    );
    return res?.data;
  }
);

//fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const res = await axios.get(
      `http://localhost:3000/api/shop/cart/get/${userId}`
    );
    return res?.data;
  }
);

//creating the slice
const shopCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartProduct.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartProduct.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shopCartSlice.reducer;
