import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankYouBaseComponent } from '../shared/thank-you-base/thank-you-base.component';
import { HomeComponent } from './home/home.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,  
  },
  {
    path: 'grazie',
    component: ThankYouBaseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
