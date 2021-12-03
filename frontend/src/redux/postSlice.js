import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    storePosts: (state, action) => {
      state.posts = action.payload;
    },
    savePost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { storePosts, savePost } = postSlice.actions;

export default postSlice.reducer;
