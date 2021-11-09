import { Action } from "redux";
import { Collection } from "../../components/types";
import { ADD_COLLECTION } from "./types";

export interface IAddCollectionAction extends Action<typeof ADD_COLLECTION> {
  payload: Collection;
}

export const addCollection = (collection: Collection): IAddCollectionAction => ({
  type: ADD_COLLECTION,
  payload: collection,
});
