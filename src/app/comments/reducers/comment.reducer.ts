import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CommentsActionsAll,
  CommentsActionTypes
} from '../actions/comment.actions';
import { CommentState } from '../../reducers/app.states';

export const initialState: CommentState = { comments: [], message: '' };

export function reducer(
  state = initialState,
  action: CommentsActionsAll
): CommentState {
  switch (action.type) {
    case CommentsActionTypes.SHOW_ALL_SUCCESS: {
      return { comments: action.payload, message: 'Success' };
    }
    case CommentsActionTypes.CREATE_SUCCESS: {
      return { comments: [action.payload], message: 'Comment Created.' };
    }
    case CommentsActionTypes.CREATE_FAILURE: {
      return { comments: [], message: action.payload };
    }
    case CommentsActionTypes.GET_BY_ID_SUCCESS: {
      console.log(action.payload);
      return { comments: action.payload, message: 'Success' };
    }
    case CommentsActionTypes.RESET: {
      return { comments: [], message: '' };
    }
    default: {
      return state;
    }
  }
}

export const getCommentState = createFeatureSelector<CommentState>(
  'commentState'
);

export const getComments = createSelector(
  getCommentState,
  (state: CommentState) => state.comments
);

export const getMessage = createSelector(
  getCommentState,
  (state: CommentState) => state.message
);
