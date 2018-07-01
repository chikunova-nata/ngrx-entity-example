import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/user.actions';
import { UserState } from '../../states/app.states';
import * as fromAdapter from './user.adapter';

export const initialState: UserState = fromAdapter.adapter.getInitialState({
  selectedUserId: null
});
export function reducer(
  state = initialState,
  action: fromActions.USER_ACTIONS
): UserState {
  switch (action.type) {
    case fromActions.UserActionTypes.ADD_USER: {
      return fromAdapter.adapter.addOne(action.payload.user, state);
    }
    case fromActions.UserActionTypes.ADD_USERS: {
      return fromAdapter.adapter.addMany(action.payload.users, state);
    }
    case fromActions.UserActionTypes.UPDATE_USER: {
      return fromAdapter.adapter.updateOne(action.payload.user, state);
    }
    case fromActions.UserActionTypes.UPDATE_USERS: {
      return fromAdapter.adapter.updateMany(action.payload.users, state);
    }
    case fromActions.UserActionTypes.REMOVE_USER: {
      return fromAdapter.adapter.removeOne(action.payload.id, state);
    }
    case fromActions.UserActionTypes.REMOVE_USERS: {
      return fromAdapter.adapter.removeMany(action.payload.ids, state);
    }
    case fromActions.UserActionTypes.CLEAR_USERS: {
      return fromAdapter.adapter.removeAll({
        ...state,
        selectedUserId: null
      });
    }
    case fromActions.UserActionTypes.LOAD_ALL_USERS_SUCCESS: {
      return fromAdapter.adapter.addAll(action.payload.users, state);
    }
    case fromActions.UserActionTypes.SELECT_USER: {
      return Object.assign({
        ...state,
        selectedUserId: action.payload.userId
      });
    }
    default: {
      return state;
    }
  }
}

export const getSelectedUserId = (state: UserState) => state.selectedUserId;

export const getUserState = createFeatureSelector<UserState>('userState');

export const selectUserIds = createSelector(
  getUserState,
  fromAdapter.selectUserIds
);
export const selectUserEntities = createSelector(
  getUserState,
  fromAdapter.selectUserEntities
);
export const selectAllUsers = createSelector(
  getUserState,
  fromAdapter.selectAllUsers
);
export const usersCount = createSelector(getUserState, fromAdapter.usersCount);

export const selectCurrentUserId = createSelector(
  getUserState,
  getSelectedUserId
);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userEntities[userId]
);
