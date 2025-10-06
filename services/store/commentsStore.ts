import { observable } from "@legendapp/state";
import { synced } from "@legendapp/state/sync";
import { loadComments } from "../api/commentsApi";

export interface Comment {
  id: string;
  text: string;
  liked: number;
  pending?: boolean;
}
export const commentsStore$ = observable<{
  comments: Comment[];
  isLoading: boolean;
  source: "unknown" | "sqlite" | "network";
}>({
  comments: synced({
    initial: [],
    get: async () => {
      const data = await loadComments();
      return data;
    },
  }),
  isLoading: false,
  source: "unknown",
});
