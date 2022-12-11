import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { UtilsLibModule } from 'src/app/FirebaseBackofficeLib/utils/utils.module';


@NgModule({
  declarations: [
    ContactListComponent,
    ContactDetailComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    UtilsLibModule,
  ],
  exports: [
    ContactListComponent
  ]
})
export class ContactModule { }
