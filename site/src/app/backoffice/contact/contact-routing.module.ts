import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/implements/authService';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';

export const contactRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthService],
    component: ContactListComponent
  },
   {
    path: ':contactId',
    canActivate: [AuthService],
    component: ContactDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(contactRoutes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
