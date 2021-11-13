import { createSelector } from "reselect";
import { Store } from "../root-reducer";

export const selectShop = (state: Store) => state.shop;

export const selectCollections = createSelector([selectShop], shop => shop.collection);

export const selectIsFetching = createSelector([selectShop], shop => shop.isFetching);
