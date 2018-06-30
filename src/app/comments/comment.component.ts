import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromReducer from './reducers/comment.reducer';
import * as fromActions from './actions/comment.actions';
import { CommentState } from '../reducers/app.states';
import { Comment } from './models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html'
})
export class CommentComponent {
  comments$: Observable<Comment[]>;
  message$: Observable<any>;
  task = '';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<CommentState>
  ) {
    this.comments$ = store.select(fromReducer.getComments);
    this.message$ = store.select(fromReducer.getMessage);
  }

  commentForm = this.formBuilder.group({
    id: ['', Validators.required],
    name: '',
    email: '',
    body: ''
  });

  get id() {
    return this.commentForm.get('id');
  }

  onFormSubmit() {
    if (this.commentForm.valid) {
      const comment = this.commentForm.value;
      this.createComment(comment);
      this.commentForm.reset();
    }
  }
  shownCommentForm() {
    this.task = 'create';
    this.store.dispatch(new fromActions.ResetAction());
  }
  getCommentByIdView() {
    this.task = 'get';
    this.store.dispatch(new fromActions.ResetAction());
  }
  loadAllComments() {
    this.task = 'all';
    this.store.dispatch(new fromActions.ShowAllAction());
  }
  createComment(comment: Comment) {
    this.store.dispatch(new fromActions.CreateAction(comment));
  }
  searchCommentById(commentId: string) {
    this.store.dispatch(new fromActions.GetByIdAction(commentId));
  }
}
