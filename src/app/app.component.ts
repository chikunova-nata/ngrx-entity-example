import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './store';

@Component({
  selector: 'app-root',
  template: `
  <app-toolbar [title]="currentPageTitle$ | async"></app-toolbar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  currentPageTitle$: Observable<string>;
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.currentPageTitle$ = this.store.select(fromRoot.getCurrentTitle);
  }
}
