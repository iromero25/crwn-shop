import { Collection } from "../../components/types";
import { IAddCollectionAction } from "./shop.actions";
import { ADD_COLLECTION } from "./types";

const shopReducer = (
  currentState: Partial<Collection> = {},
  action: IAddCollectionAction
) => {
  switch (action.type) {
    case ADD_COLLECTION:
      return action.payload;
    default:
      return currentState;
  }
};

export default shopReducer;
