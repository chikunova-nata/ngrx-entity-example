import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { ArticleComponent } from './articles/article.component';
import { reducers, metaReducers } from './reducers/reducers';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store DevTools',
      logOnly: environment.production
    })
  ],
  declarations: [AppComponent, ArticleComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
