import { Component, Injector } from '@angular/core';
import { BaseLibComponent } from 'src/app/FirebaseBackofficeLib/backoffice-lib/base-lib/base-lib.component';
import { ContactBase } from 'src/app/FirebaseBackofficeLib/backoffice-lib/contact-base/contact-base';
import { OriginBase } from 'src/app/FirebaseBackofficeLib/backoffice-lib/origin-base/origin-base';
import { ICustomerBase } from 'src/app/FirebaseBackofficeLib/interface/iCustomerBase';
import { Menu } from 'src/app/FirebaseBackofficeLib/utils/firebase/models/menu';

@Component({
  selector: 'app-my-base-component',
  templateUrl: './my-base-component.component.html',
  styleUrls: ['./my-base-component.component.scss']
})
export class MyBaseComponent extends BaseLibComponent {

  constructor(public override injector: Injector) {
    super(injector);
  }

  protected override buildMenu(customer: ICustomerBase | null) {
    super.buildMenu(customer);
    this.menu.push(new Menu('contacts', 'Contatti', ContactBase.getIcon()));
    if (customer?.isGeneralAdmin()) {
      this.menu.push(new Menu('origins', 'Pagine', OriginBase.getIcon()));
      this.menu.push(new Menu('configuration', 'Configurazione', "construction"));
    }
  }

}
