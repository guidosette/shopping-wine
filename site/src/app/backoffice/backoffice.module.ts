import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from './shared/shared.module';
import { ContactModule } from './contact/contact.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule,
    ContactModule,
  ]
})
export class BackofficeModule { }
