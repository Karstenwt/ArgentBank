import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload; // Ajouter les infos
    },
  },
});

export const { loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;
export default authSlice.reducer;
