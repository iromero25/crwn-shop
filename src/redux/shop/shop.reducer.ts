import { Collection } from "../../components/types";
import { IAddCollectionAction, IFetchCollectionStart, IFetchError } from "./shop.actions";
import { ADD_COLLECTION, FETCH_COLLECTIONS_START, FETCH_COLLECTION_ERROR } from "./types";

interface IInitialState {
  collection: Collection;
  error: string;
  isFetching: boolean;
}

const initialState: IInitialState = {
  collection: {} as Collection,
  error: "",
  isFetching: true,
};

const shopReducer = (
  currentState = initialState,
  action: IAddCollectionAction | IFetchError | IFetchCollectionStart
) => {
  switch (action.type) {
    case FETCH_COLLECTIONS_START:
      return {
        ...currentState,
        isFetching: true,
      };
    case ADD_COLLECTION:
      return {
        ...currentState,
        collection: action.payload,
        error: "",
        isFetching: false,
      };

    case FETCH_COLLECTION_ERROR:
      return { ...currentState, error: action.payload, isFetching: false };

    default:
      return currentState;
  }
};

export default shopReducer;
