import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

//register async thunk
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const res = await axios.post(
      "http://localhost:8003/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
);

//login async thunk
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const res = await axios.post(
    "http://localhost:8003/api/auth/login",
    formData,
    {
      withCredentials: true,
    }
  );
  return res.data;
});

//logout thunk
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const res = await axios.post(
    "http://localhost:8003/api/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return res?.data;
});

//check auth thunk
export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
  const res = await axios.get("http://localhost:8003/api/auth/check-auth", {
    withCredentials: true,
    header: {
      "Cache-Control": "no-store, no-cache must-revalidate, proxy-revalidate",
      Expires: "0",
    },
  });
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerUser.fulfilled,

        (state) => {
          (state.isLoading = false),
            (state.user = null),
            (state.isAuthenticated = false);
        }
      )
      .addCase(registerUser.rejected, (state) => {
        (state.isLoading = false),
          state.user - null,
          (state.isAuthenticated = false);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,

        (state, action) => {
          (state.isLoading = false),
            (state.user = action.payload.success ? action.payload.user : null),
            (state.isAuthenticated = action.payload.success);
        }
      )
      .addCase(loginUser.rejected, (state) => {
        (state.isLoading = false),
          state.user - null,
          (state.isAuthenticated = false);
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        checkAuth.fulfilled,

        (state, action) => {
          (state.isLoading = false),
            (state.user = action.payload.success ? action.payload.user : null),
            (state.isAuthenticated = action.payload.success);
        }
      )
      .addCase(checkAuth.rejected, (state) => {
        (state.isLoading = false),
          state.user - null,
          (state.isAuthenticated = false);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        (state.isAuthenticated = true),
          (state.isLoading = false),
          (state.user = action?.payload?.user);
      });
  },
});

export const setUser = authSlice.actions;
export default authSlice.reducer;
