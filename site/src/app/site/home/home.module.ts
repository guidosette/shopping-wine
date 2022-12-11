import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CountUpDirective } from 'src/app/PaUtils/count-up.directive';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PaModule } from 'src/app/PaUtils/pa.module';
import { UtilsLibModule } from 'src/app/FirebaseBackofficeLib/utils/utils.module';


@NgModule({
  declarations: [
    HomeComponent,
    CountUpDirective
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UtilsLibModule,
    PaModule,
    SharedModule,
  ]
})
export class HomeModule { }
