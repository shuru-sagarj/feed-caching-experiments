import { observable } from "@legendapp/state";
import { synced } from "@legendapp/state/sync";
import { loadComments } from "../api/commentsApi";
import { connectionStore } from "./connectionStore";

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
      const isOnline = connectionStore?.isOnline.get?.();
      if (isOnline) {
        const data = await loadComments();
        return data;
      }
    },
    // syncMode: "auto",
    // set: async ({ changes, value }) => {
    //   console.log("Changes", changes);
    //   console.log("Value", value);
    // },
  }),
  isLoading: false,
  source: "unknown",
});
