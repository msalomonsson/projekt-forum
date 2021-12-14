import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  likes: null,
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
      const posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          post.data.title = action.payload.data.title;
          post.data.body = action.payload.data.body;
          post.time = action.payload.time;
        }
        return post;
      });
      state.posts = posts;
    },

    savePost: (state, action) => {
      state.posts.push(action.payload);
    },

    setLikes: (state, action) => {
      state.likes = action.payload;
    },

    likePost: (state, action) => {
      state.likes.push(action.payload);
      const updatedLike = state.posts.map((post) => {
        if (post.id === action.payload.data.post_id) {
          post.data.likes++;
        }
        return post;
      });

      state.posts = updatedLike;
    },

    unlikePost: (state, action) => {
      const deleteLike = state.likes.findIndex(
        (like) =>
          like.data.post_id === action.payload.data.post_id &&
          like.data.user_id === action.payload.data.user_id
      );

      state.likes.splice(deleteLike, 1);

      const updatedLike = state.posts.map((post) => {
        if (post.id === action.payload.data.post_id) {
          post.data.likes--;
        }
        return post;
      });
      state.posts = updatedLike;
    },
  },
});

export const {
  storePosts,
  deletePost,
  savePost,
  editPost,
  setLikes,
  likePost,
  unlikePost,
} = postSlice.actions;

export default postSlice.reducer;
