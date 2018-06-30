import { Article } from '../articles/models/article';
import { Comment } from '../comments/models/comment';

export interface ArticleState {
  articles: Article[];
}
export interface CommentState {
  comments: Comment[];
  message: any;
}

export interface AppState {
  articleState: ArticleState;
  commentState: CommentState;
}
