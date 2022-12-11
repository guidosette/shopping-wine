import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { BaseSiteComponent } from './base-site/base-site.component';
import { PaModule } from '../PaUtils/pa.module';
import { UtilsLibModule } from '../FirebaseBackofficeLib/utils/utils.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    BaseSiteComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    UtilsLibModule,
    PaModule,
    SharedModule,
    HomeModule
  ],
  providers: [
    { provide: 'googleTagManagerId', useValue: SiteModule.googleTagManagerID }
  ]
})
export class SiteModule { 
  public static baseUrl: string = "https://shopping-wine.it";
  public static googleTagManagerID: string = "GTM-XXXXXX";
  public static privacyUrlPath: string = "https://www.iubenda.com/privacy-policy/xxxxx";
  public static cookieUrlPath: string = "https://www.iubenda.com/privacy-policy/xxxxx/cookie-policy";
  public static iubendaConsentPrivateApiKey: string = "";
  public static recaptcha: string = "";
}
