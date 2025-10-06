import { observable } from "@legendapp/state";

export const connectionStore = observable<{ isOnline: boolean }>({
  isOnline: true,
});

export const toggleNetwork = () => {
  connectionStore.isOnline.set((prev) => !prev);
};
