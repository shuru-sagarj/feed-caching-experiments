import { observablePersistSqlite } from "@legendapp/state/persist-plugins/expo-sqlite";
import { configureSynced, syncObservable } from "@legendapp/state/sync";
import Storage from "expo-sqlite/kv-store";
import { commentsStore$ } from "./commentsStore";

const persistOptions = configureSynced({
  persist: {
    plugin: observablePersistSqlite(Storage),
  },
});

syncObservable(
  commentsStore$,
  persistOptions({
    persist: {
      name: "commentsStore",
    },
  })
);

// TODO: Remove, for testing purposes only
if (commentsStore$.comments.get().length > 0) {
  commentsStore$.source.set("sqlite");
} else {
  commentsStore$.source.set("network");
}