import { Action } from "easy-peasy";
export interface Comment {
  id: string;
  text: string;
  liked: number;
  pending?: boolean;
}

export interface CommentsModel {
  comments: Comment[];
  isLoading: boolean;
  setComments: Action<CommentsModel, Comment[]>;
  setIsLoading: Action<CommentsModel, boolean>;
  addComment: Action<CommentsModel, Comment>;
  updateComment: Action<CommentsModel, Partial<Comment>>;
}
