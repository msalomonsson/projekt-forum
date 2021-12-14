import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    storeComments: (state, action) => {
      state.comments = action.payload;
    },
    updateCommentState: (state, action) => {
      state.comments.push(action.payload);
    },
    deleteCommentState: (state, action) => {
      const comments = state.comments.filter((comment) => {
        return comment.id !== action.payload;
      });

      state.comments = comments;
    },
  },
});

export const { storeComments, updateCommentState, deleteCommentState } =
  commentSlice.actions;

export default commentSlice.reducer;
