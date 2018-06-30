import { Action } from '@ngrx/store';
import { Article } from '../models/article';

export enum ArticleActionTypes {
  REACT = 'React',
  ANGULAR = 'Angular',
  MY_ARTICLES = 'Favorite_Articles'
}

export class ReactArticlesAction implements Action {
  readonly type = ArticleActionTypes.REACT;
}

export class AngularArticlesAction implements Action {
  readonly type = ArticleActionTypes.ANGULAR;
}

export class FavoriteArticlesAction implements Action {
  readonly type = ArticleActionTypes.MY_ARTICLES;

  constructor(public payload: Article[]) {}
}

export type ArticleActionsAll =
  | ReactArticlesAction
  | AngularArticlesAction
  | FavoriteArticlesAction;
