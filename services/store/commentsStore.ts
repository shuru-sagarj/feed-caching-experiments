import { observable } from "@legendapp/state";

export interface Comment {
  id: string;
  text: string;
  liked: number; // 0 not liked, 1 liked
  pending?: boolean;
}

export const commentsStore = observable<{
  comments: Comment[];
  isLoading: boolean;
}>({
  comments: [],
  isLoading: false,
});
