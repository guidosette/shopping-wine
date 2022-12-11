import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteBaseComponent } from 'src/app/PaUtils/component/site-base.component';

@Component({
  selector: 'app-base-shared',
  template: ``
})
export class BaseSharedComponent extends SiteBaseComponent {


  constructor(injector: Injector, router: Router, route: ActivatedRoute) {
    super(injector, router, route);
    this.seoService.setNoIndex();
  }

}
