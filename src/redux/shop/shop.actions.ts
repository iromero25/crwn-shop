import { Action } from "redux";
import { Collection } from "../../components/types";
import { ADD_COLLECTION, FETCH_COLLECTIONS_START, FETCH_COLLECTION_ERROR } from "./types";

export interface IFetchCollectionStart extends Action<typeof FETCH_COLLECTIONS_START> {}

export const startCollectionFetch = () => ({
  type: FETCH_COLLECTIONS_START,
});

export interface IAddCollectionAction extends Action<typeof ADD_COLLECTION> {
  payload: Collection;
}

export const addCollection = (collection: Collection): IAddCollectionAction => ({
  type: ADD_COLLECTION,
  payload: collection,
});

export interface IFetchError extends Action<typeof FETCH_COLLECTION_ERROR> {
  payload: string;
}

export const fetchCollectionError = (error: string): IFetchError => ({
  type: FETCH_COLLECTION_ERROR,
  payload: error,
});
