import { Component, Injector, Input } from '@angular/core';
import { ContactBase } from 'src/app/FirebaseBackofficeLib/backoffice-lib/contact-base/contact-base';
import { FormBaseContactComponent } from 'src/app/PaUtils/component/form-base-contact.component';
import { SiteModule } from '../../site.module';
import { Contact } from 'src/app/backoffice/contact/contact';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent extends FormBaseContactComponent<Contact> {

  @Input() title = ''
  @Input() subTitle = ''

  privacyUrlPath = SiteModule.privacyUrlPath;
  recaptcha = SiteModule.recaptcha;

  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.createButtonName = "OK, INVIA!";
    this.iubendaConsentPrivateApiKey = SiteModule.iubendaConsentPrivateApiKey;
    // this.originEnum = OriginEnum.Home;
  }

  override getInstance(): Contact {
    return new Contact();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override async buildModel(formValue: any): Promise<void> {
    super.buildModel(formValue);
    if (this.model) {
    }
  }


}
