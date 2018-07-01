import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from '../states/app.states';
import * as articleReducer from '../articles/reducers/article.reducer';
import * as userReducer from '../users/reducers/user.reducer';
import { environment } from '../../environments/environment';

export const reducers: ActionReducerMap<AppState> = {
  articleState: articleReducer.reducer,
  userState: userReducer.reducer
};

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
