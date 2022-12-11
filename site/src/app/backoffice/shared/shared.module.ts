import { NgModule } from '@angular/core';
import { UtilsLibModule } from 'src/app/FirebaseBackofficeLib/utils/utils.module';
import { MyBreadcrumbComponent } from 'src/app/override/my-breadcrumb/my-breadcrumb.component';
import { BaseSharedComponent } from './base-shared.component';



@NgModule({
  declarations: [
    MyBreadcrumbComponent,
    BaseSharedComponent
  ],
  imports: [
    UtilsLibModule
  ],
  exports: [
    MyBreadcrumbComponent,
    BaseSharedComponent
  ]
})
export class SharedModule { }
