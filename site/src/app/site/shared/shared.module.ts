import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseComponent } from './form-base/form-base.component';
import { UtilsLibModule } from 'src/app/FirebaseBackofficeLib/utils/utils.module';
import { PaModule } from 'src/app/PaUtils/pa.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ThankYouBaseComponent } from './thank-you-base/thank-you-base.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    FormBaseComponent,
    FooterComponent,
    ThankYouBaseComponent,
    MenuComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    PaModule,
    UtilsLibModule,
    RouterModule
  ],
  exports: [
    FormBaseComponent,
    FooterComponent,
    MenuComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
