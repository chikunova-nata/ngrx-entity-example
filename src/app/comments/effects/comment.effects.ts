import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable, throwError } from 'rxjs';
import {
  map,
  mergeMap,
  switchMap,
  catchError,
  debounceTime
} from 'rxjs/operators';

import * as fromActions from '../actions/comment.actions';
import { CommentService } from '../services/comment.service';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService
  ) {}

  @Effect()
  loadAllComments$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.CommentsActionTypes.SHOW_ALL),
    mergeMap(() => this.commentService.getAllComments()),
    map(data => new fromActions.ShowAllSuccessAction(data)),
    catchError(err => {
      console.log('error loading all comments ', err);
      return throwError(err);
    })
  );

  @Effect()
  createComment$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.CreateAction>(fromActions.CommentsActionTypes.CREATE),
    map(action => action.payload),
    mergeMap(comment => this.commentService.createComment(comment)),
    map(data => new fromActions.CreateSuccessAction(data)),
    catchError(err => {
      console.log('error creating a new comment ', err);
      return throwError(err);
    })
  );

  @Effect()
  searchCommentById$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.GetByIdAction>(fromActions.CommentsActionTypes.GET_BY_ID),
    debounceTime(500),
    map(action => action.payload),
    switchMap(id => this.commentService.getCommentById(id)),
    map(data => new fromActions.GetByIdSuccessAction(data)),
    catchError(err => {
      console.log('error searching comment by id', err);
      return throwError(err);
    })
  );
}
