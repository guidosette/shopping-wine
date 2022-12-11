import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './FirebaseBackofficeLib/general/access-denied/access-denied.component';
import { FourOFourComponent } from './FirebaseBackofficeLib/general/four-o-four/four-o-four.component';
import { ForgotPasswordComponent } from './FirebaseBackofficeLib/intro/forgot-password/forgot-password.component';
import { LoginComponent } from './FirebaseBackofficeLib/intro/login/login.component';
import { AuthService } from './implements/authService';
import { MyBaseComponent } from './override/my-base-component/my-base-component.component';
import { BaseSiteComponent } from './site/base-site/base-site.component';
import { PaModule } from './PaUtils/pa.module';

const routes: Routes = [
  {
    path: 'backoffice',
    canActivate: [AuthService],
    component: MyBaseComponent,
    loadChildren: () => import('./backoffice/backoffice.module').then(mod => mod.BackofficeModule),
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'accessDenied',
    component: AccessDeniedComponent
  },
  {
    path: '',
    component: BaseSiteComponent,
    // children: siteRoutes
    loadChildren: () => import('./site/site.module').then(mod => mod.SiteModule),
  },
  {
    path: '**',
    component: FourOFourComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, PaModule.getRouteExtraOptions())],
  exports: [RouterModule]
})
export class AppRoutingModule { }
