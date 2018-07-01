import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { UserComponent } from './users/user.component';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { UserEffects } from './users/effects/user.effects';
import { UserService } from './users/services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store DevTools',
      logOnly: environment.production
    })
  ],
  declarations: [AppComponent, UserComponent],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
