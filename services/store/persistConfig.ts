import { observablePersistSqlite } from "@legendapp/state/persist-plugins/expo-sqlite";
import { configureSynced, syncObservable } from "@legendapp/state/sync";
import Storage from "expo-sqlite/kv-store";
import { commentsStore$ } from "./commentsStore";
import { connectionStore } from "./connectionStore";

const persistOptions = configureSynced({
  persist: {
    plugin: observablePersistSqlite(Storage),
  },
});

syncObservable(
  commentsStore$,
  persistOptions({
    syncMode: "auto", // Toggle this to see where the data was loaded from
    persist: {
      name: "commentsStore",
    },
  })
);

//TODO: For testing purposes only
syncObservable(
  connectionStore,
  persistOptions({
    syncMode: "manual",
    persist: {
      name: "connectionStore",
    },
  })
);

// TODO: Remove, for testing purposes only
if (commentsStore$.comments.get().length > 0) {
  commentsStore$.source.set("sqlite");
} else {
  commentsStore$.source.set("network");
}
