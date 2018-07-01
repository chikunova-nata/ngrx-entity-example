import { EntityState } from '@ngrx/entity';

import { Article } from '../articles/models/article';
import { User } from '../users/models/user';

export interface ArticleState {
  articles: Article[];
}

export interface UserState extends EntityState<User> {
  selectedUserId: string | number | null;
}

export interface AppState {
  articleState: ArticleState;
  userState: UserState;
}
