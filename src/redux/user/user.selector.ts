import { Store } from "../root-reducer";
import { createSelector } from "reselect";
import { ICurrentUser } from "../../components/types";

const selectUser = (state: Store) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser as ICurrentUser
);
