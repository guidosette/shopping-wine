import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourOFourComponent } from '../FirebaseBackofficeLib/general/four-o-four/four-o-four.component';
import { languageRouteMatcher, TranslateResolver } from '../PaUtils/managers/translate-resolver';

export const siteRoutes: Routes = [
  // { path: '', redirectTo: 'it', pathMatch: 'full' },
  {
    path: '',
    // matcher: languageRouteMatcher,
    resolve: { content: TranslateResolver }, //source -> data: { source: "home" },
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
      },
      {
        path: '**',
        component: FourOFourComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(siteRoutes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
