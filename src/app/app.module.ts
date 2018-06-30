import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from './reducers/reducers';
import { environment } from '../environments/environment';

import { ArticleComponent } from './articles/article.component';
import { CommentComponent } from './comments/comment.component';
import { CommentEffects } from './comments/effects/comment.effects';
import { CommentService } from './comments/services/comment.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([CommentEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store DevTools',
      logOnly: environment.production
    })
  ],
  declarations: [AppComponent, ArticleComponent, CommentComponent],
  providers: [CommentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
