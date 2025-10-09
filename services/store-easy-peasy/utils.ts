import { createTypedHooks } from "easy-peasy";
import { CommentsModel } from "./comments-model";

export interface RootModel {
  comments: CommentsModel;
}

const typedHooks = createTypedHooks<RootModel>();
export const useAppStoreState = typedHooks.useStoreState;
export const useAppStoreActions = typedHooks.useStoreActions;
