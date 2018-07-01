import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity/src/models';
import { User } from '../models/user';

export enum UserActionTypes {
  ADD_USER = '[USER] Add User',
  ADD_USERS = '[USER] Add Users',
  UPDATE_USER = '[USER] Update User',
  UPDATE_USERS = '[USER] Update Users',
  REMOVE_USER = '[USER] Remove User',
  REMOVE_USERS = '[USER] Remove Users',
  CLEAR_USERS = '[USER] Clear Users',
  LOAD_ALL_USERS = '[USER] Load All Users',
  LOAD_ALL_USERS_SUCCESS = '[USER] Load All Users Success',
  SELECT_USER = '[USER] User By Id'
}

export class AddUser implements Action {
  readonly type = UserActionTypes.ADD_USER;
  constructor(public payload: { user: User }) {}
}
export class AddUsers implements Action {
  readonly type = UserActionTypes.ADD_USERS;
  constructor(public payload: { users: User[] }) {}
}
export class UpdateUser implements Action {
  readonly type = UserActionTypes.UPDATE_USER;
  constructor(public payload: { user: Update<User> }) {}
}
export class UpdateUsers implements Action {
  readonly type = UserActionTypes.UPDATE_USERS;
  constructor(public payload: { users: Update<User>[] }) {}
}
export class RemoveUser implements Action {
  readonly type = UserActionTypes.REMOVE_USER;
  constructor(public payload: { id: string }) {}
}
export class RemoveUsers implements Action {
  readonly type = UserActionTypes.REMOVE_USERS;
  constructor(public payload: { ids: string[] }) {}
}
export class ClearUsers implements Action {
  readonly type = UserActionTypes.CLEAR_USERS;
}
export class LoadUsers implements Action {
  readonly type = UserActionTypes.LOAD_ALL_USERS;
}
export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LOAD_ALL_USERS_SUCCESS;
  constructor(public payload: { users: User[] }) {}
}
export class SelectUser implements Action {
  readonly type = UserActionTypes.SELECT_USER;
  constructor(public payload: { userId: string }) {}
}
export type USER_ACTIONS =
  | AddUser
  | AddUsers
  | UpdateUser
  | UpdateUsers
  | RemoveUser
  | RemoveUsers
  | ClearUsers
  | LoadUsersSuccess
  | SelectUser;
