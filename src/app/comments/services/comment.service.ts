import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) {}

  url = 'https://jsonplaceholder.typicode.com/comments';
  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url);
  }
  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url, comment);
  }
  getCommentById(id: string): Observable<Comment[]> {
    console.log(id);
    return this.http.get<Comment[]>(`${this.url}?id=${id}`);
  }
}
