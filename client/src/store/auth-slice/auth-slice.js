import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

//register user
export const registerUserAction = createAsyncThunk(
  "/auth/register",
  async (FormData) => {
    const res = await axios.post(
      "http://localhost:8003/api/auth/register",
      FormData,
      { withCredentials: true }
    );
    return res.data;
  }
);

//log in user

export const loginUserAction = createAsyncThunk(
  "/auth/login",
  async (FormData) => {
    const res = await axios.post(
      "http://localhost:8003/api/auth/login",
      FormData,
      { withCredentials: true }
    );
    return res.data;
  }
);

//logout user
export const logoutUserAction = createAsyncThunk("/auth/logout", async () => {
  const res = await axios.post(
    "http://localhost:8003/api/auth/logout",
    {},
    { withCredentials: true }
  );
  return res.data;
});

//checking authentication
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const res = await axios.get(
    "http://localhost:8003/api/auth/check-auth",

    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
      },
    }
  );
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = !action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = !action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
