import { Action } from '@ngrx/store';
import { Comment } from '../models/comment';

export enum CommentsActionTypes {
  SHOW_ALL = '[COMMENT] Show All',
  SHOW_ALL_SUCCESS = '[COMMENT] Show All Success',
  CREATE = '[COMMENT] Create',
  CREATE_SUCCESS = '[COMMENT] Create Success',
  CREATE_FAILURE = '[COMMENT] Create Failure',
  GET_BY_ID = '[COMMENT] Get by Id',
  GET_BY_ID_SUCCESS = '[COMMENT] Get by Id Success',
  RESET = '[COMMENT] Reset'
}

export class ShowAllAction implements Action {
  readonly type = CommentsActionTypes.SHOW_ALL;
}
export class ShowAllSuccessAction implements Action {
  readonly type = CommentsActionTypes.SHOW_ALL_SUCCESS;
  constructor(public payload: Comment[]) {}
}
export class CreateAction implements Action {
  readonly type = CommentsActionTypes.CREATE;
  constructor(public payload: Comment) {}
}
export class CreateSuccessAction implements Action {
  readonly type = CommentsActionTypes.CREATE_SUCCESS;
  constructor(public payload: Comment) {}
}
export class CreateFailureAction implements Action {
  readonly type = CommentsActionTypes.CREATE_FAILURE;
  constructor(public payload: any) {}
}
export class GetByIdAction implements Action {
  readonly type = CommentsActionTypes.GET_BY_ID;
  constructor(public payload: string) {}
}
export class GetByIdSuccessAction implements Action {
  readonly type = CommentsActionTypes.GET_BY_ID_SUCCESS;
  constructor(public payload: Comment[]) {}
}
export class ResetAction implements Action {
  readonly type = CommentsActionTypes.RESET;
}

export type CommentsActionsAll =
  | ShowAllSuccessAction
  | CreateSuccessAction
  | CreateFailureAction
  | GetByIdSuccessAction
  | ResetAction;
