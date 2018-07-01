import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { TitleResolver } from '../core/resolvers/title.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home page title' },
    pathMatch: 'full',
    resolve: { title: TitleResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
