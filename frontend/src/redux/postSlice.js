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
    deletePost: (state, action) => {
      console.log(action.payload);

      console.log(state.posts);

      const posts = state.posts.filter((post) => {
        return post.id !== action.payload;
      });

      state.posts = posts;
    },
    savePost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { storePosts, deletePost, savePost } = postSlice.actions;

export default postSlice.reducer;
