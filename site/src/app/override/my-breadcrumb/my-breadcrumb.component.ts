import { Component, Injector } from '@angular/core';
import { OriginBase } from 'src/app/FirebaseBackofficeLib/backoffice-lib/origin-base/origin-base';
import { OriginBaseManager } from 'src/app/FirebaseBackofficeLib/backoffice-lib/origin-base/origin-base-manager';
import {
  BreadcrumbComponent,
  BreadcrumbModel
} from 'src/app/FirebaseBackofficeLib/utils/widget/breadcrumb/breadcrumb.component';
import { Customer } from 'src/app/implements/customer';

@Component({
  selector: 'app-my-breadcrumb',
  templateUrl: './my-breadcrumb.component.html',
  styleUrls: ['./my-breadcrumb.component.scss']
})
export class MyBreadcrumbComponent extends BreadcrumbComponent {

  constructor(public override injector: Injector,
  ) {
    super(injector);
  }

  override async onUrlParamsReady(params: any) {
    // super.onUrlParamsReady(params);
    // console.log("params", params);

    await this.baseRouting(params);

  }


}
