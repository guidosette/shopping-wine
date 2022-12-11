import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { customerBaseRoutes } from '../FirebaseBackofficeLib/backoffice-lib/customer-base/customer-base-routing.module';
import { originBaseRoutes } from '../FirebaseBackofficeLib/backoffice-lib/origin-base/origin-base-routing.module';
import { profileBaseRoutes } from '../FirebaseBackofficeLib/backoffice-lib/profile-base/profile-base-routing.module';
import { AccessDeniedComponent } from '../FirebaseBackofficeLib/general/access-denied/access-denied.component';
import { contactBaseRoutes } from '../FirebaseBackofficeLib/backoffice-lib/contact-base/contact-base-routing.module';
import { FourOFourComponent } from '../FirebaseBackofficeLib/general/four-o-four/four-o-four.component';
import { configurationBaseRoutes } from '../FirebaseBackofficeLib/backoffice-lib/configuration-base/configuration-base-routing.module';
import { contactRoutes } from './contact/contact-routing.module';

export const backofficeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    children: profileBaseRoutes
  },
  {
    path: 'customers',
    children: customerBaseRoutes
  },
  {
    path: 'origins',
    children: originBaseRoutes
  },
  {
    path: 'contacts',
    children: contactRoutes
  },
  {
    path: 'configuration',
    children: configurationBaseRoutes
  },
  {
    path: 'accessDenied',
    component: AccessDeniedComponent
  },
  {
    path: '**',
    component: FourOFourComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(backofficeRoutes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
