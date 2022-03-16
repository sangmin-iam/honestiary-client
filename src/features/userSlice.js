import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { firebaseGoogleLogin } from "../api/axios";
import { ACCESS_TOKEN } from "../constants/auth";

export const login = createAsyncThunk(
  "user/login",
  async (_, { rejectWithValue }) => {
    try {
      const response = await firebaseGoogleLogin();

      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  user: {
    _id: "",
    email: "",
    name: "",
  },
  status: null,
  isLoggedIn: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
        _id: "",
        email: "",
        name: "",
      };
      state.status = null;
      state.isLoggedIn = false;
      state.errorMessage = "";
      localStorage.removeItem(ACCESS_TOKEN);
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "pending";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoggedIn = true;
      state.errorMessage = "";
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.isLoggedIn = false;
      state.errorMessage = action.payload;
      localStorage.removeItem(ACCESS_TOKEN);
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
