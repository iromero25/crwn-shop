import { Store } from "../root-reducer";
import { createSelector } from "reselect";

const selectUser = (state: Store) => state.user;

export const selectCurrentUser = createSelector([selectUser], user => user.currentUser);
