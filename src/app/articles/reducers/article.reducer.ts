import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ArticleActionsAll,
  ArticleActionTypes
} from '../actions/article.actions';
import { React_ARTICLES, ANGULAR_ARTICLES } from '../models/article';
import { ArticleState } from '../../reducers/app.states';

export const initialState: ArticleState = { articles: [] };

export function reducer(
  state = initialState,
  action: ArticleActionsAll
): ArticleState {
  switch (action.type) {
    case ArticleActionTypes.REACT: {
      return { articles: React_ARTICLES };
    }
    case ArticleActionTypes.ANGULAR: {
      return { articles: ANGULAR_ARTICLES };
    }
    case ArticleActionTypes.MY_ARTICLES: {
      return { articles: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getArticleState = createFeatureSelector<ArticleState>(
  'articleState'
);

export const getArticles = createSelector(
  getArticleState,
  (state: ArticleState) => state.articles
);
