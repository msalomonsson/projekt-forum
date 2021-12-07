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
      const posts = state.posts.filter((post) => {
        return post.id !== action.payload;
      });

      state.posts = posts;
    },

    editPost: (state, action) => {
      console.log(action.payload);
      const posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          post.data.title = action.payload.data.title;
          post.data.body = action.payload.data.body;
        }
        return post;
      });
      state.posts = posts;
    },

    savePost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { storePosts, deletePost, savePost, editPost } = postSlice.actions;

export default postSlice.reducer;
