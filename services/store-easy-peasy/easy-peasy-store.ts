import { action, createStore, thunk } from "easy-peasy";
import { loadComments } from "../api/commentsApi";
import { Comment, CommentsModel } from "./comments-model";

export const commentsModel: CommentsModel = {
  comments: [],
  isLoading: false,
  setComments: action((state, payload: Comment[]) => {
    state.comments = payload;
  }),
  setIsLoading: action((state, payload: boolean) => {
    state.isLoading = payload;
  }),
  addComment: action((state, newComment) => {
    state.comments.push(newComment);
  }),
  updateComment: action((state, updatedComment) => {
    const index = state.comments.findIndex((c) => c.id === updatedComment.id);
    delete updatedComment.id;
    if (index !== -1) {
      state.comments[index] = {
        ...state.comments[index],
        ...updatedComment,
      };
    }
  }),
  // --- Thunk to load from network
  loadCommentsFromNetwork: thunk(async (actions) => {
    actions.setIsLoading(true);
    try {
      const comments = await loadComments();
      actions.setComments(comments);
    } catch (e) {
      actions.setComments([]);
    }
    actions.setIsLoading(false);
  }),
};

const rootModel = {
  comments: commentsModel,
};

const store = createStore(rootModel);

export default store;
