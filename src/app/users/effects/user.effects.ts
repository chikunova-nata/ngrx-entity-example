import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromActions from '../actions/user.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  loadAllUsers$: Observable<Action> = this.actions$.pipe(
    ofType(fromActions.UserActionTypes.LOAD_ALL_USERS),
    switchMap(() => this.userService.getAllUsers()),
    map(data => new fromActions.LoadUsersSuccess({ users: data })),
    catchError(err => {
      console.log('error creating a new comment ', err);
      return throwError(err);
    })
  );
}
