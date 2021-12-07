import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    storePosts: (state, action) => {
      console.log("storeposts", action.payload);
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
      console.log("savepost", action.payload);
      state.posts.push(action.payload);
    },
  },
});

export const { storePosts, deletePost, savePost } = postSlice.actions;

export default postSlice.reducer;
