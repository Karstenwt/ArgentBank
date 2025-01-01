import { createSlice } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user profile");
      }
      return data.body; // Contient les données utilisateur
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchProfileStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProfileSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchProfileFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } =
  profileSlice.actions;

export default profileSlice.reducer;
