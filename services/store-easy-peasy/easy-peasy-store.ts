import { action, createStore } from "easy-peasy";
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
};

const rootModel = {
  comments: commentsModel,
};

const store = createStore(rootModel);

export default store;
