import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IAuthService } from './FirebaseBackofficeLib/interface/iAuthService';
import { IOriginManager } from './FirebaseBackofficeLib/interface/iOriginManager';
import { IRoleManager } from './FirebaseBackofficeLib/interface/iRoleManager';
import { PaFirebaseBackofficeConfig } from './FirebaseBackofficeLib/pa-firebase-backoffice-config';
import { PaFirebaseBackofficeModule } from './FirebaseBackofficeLib/pa-firebase-backoffice.module';
import { AuthService } from './implements/authService';
import { Manager } from './implements/manager';
import { OriginManagerImpl } from './implements/OriginManagerImpl';
import { RoleManagerImpl } from './implements/roleManagerImpl';
import { MyBaseComponent } from './override/my-base-component/my-base-component.component';
import { MyBreadcrumbComponent } from './override/my-breadcrumb/my-breadcrumb.component';
import { SiteModule } from './site/site.module';


@NgModule({
  declarations: [
    AppComponent,
    MyBaseComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserModule, // important
    BrowserAnimationsModule, // important
    PaFirebaseBackofficeModule.forRoot(new PaFirebaseBackofficeConfig(
      environment.production,
      environment.firebaseConfig,
      Manager,
      true,
      "shopping-wine",
      undefined, undefined,
      MyBreadcrumbComponent
    )),
    SiteModule
  ],
  providers: [
    { provide: IAuthService, useClass: AuthService },
    { provide: IRoleManager, useClass: RoleManagerImpl},
    {provide: IOriginManager, useClass: OriginManagerImpl},
    // {provide: IBreakPointManager, useClass: BreakPointManagerImpl},
    // { provide: ITranslateManager, useClass: TranslateManager},
   // { provide: IAuthBaseManager, useClass: AuthManager},
   // { provide: ICustomerBaseManager, useClass: CustomerManager},
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
