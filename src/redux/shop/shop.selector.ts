import { createSelector } from "reselect";
import { Store } from "../root-reducer";
import { CollectionKeys } from "../../components/types";

export const selectShop = (state: Store) => state.shop;

export const selectCollections = createSelector([selectShop], shop => shop.collection);

export const selectCollection = (collectionId: CollectionKeys) =>
  createSelector([selectCollections], collection => collection[collectionId]);

export const selectIsFetching = createSelector([selectShop], shop => shop.isFetching);
