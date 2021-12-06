import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload.data;
    },
  },
});

export const { storeUser } = userSlice.actions;

export default userSlice.reducer;
