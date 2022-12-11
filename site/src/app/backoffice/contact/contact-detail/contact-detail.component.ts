import { Component, Injector } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { AbstractBaseDetail } from 'src/app/FirebaseBackofficeLib/utils/components/base-detail/base-detail.component';
import { BaseListParams } from 'src/app/FirebaseBackofficeLib/utils/components/base-list/base-list.component';
import { FirestoreManagerBase } from 'src/app/FirebaseBackofficeLib/utils/firebase/managers/firestore-manager-base';
import { MY_FORMATS_DATE } from 'src/app/FirebaseBackofficeLib/utils/managers/utils-manager';
import { OriginClass, OriginEnum } from '../../shared/originEnum';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE},
  ],
})
export class ContactDetailComponent extends AbstractBaseDetail<Contact> {

  public originClass?: OriginClass[];
  public OriginEnum = OriginEnum;
  

  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.showActionsCreate = false;
    this.showActionsEdit = false;
    this.showActionsDelete = true;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.originClass = new OriginClass(undefined).getList(false) as OriginClass[];
  }


  override getInstance(): Contact {
    return new Contact();
  }

  override getInstanceName(): string {
    return 'Contact'
  }

  override getUrlParamIdName(): string {
    return 'contactId'
  }

  override buildForm(): void {
    this.formGroup = new UntypedFormGroup({
      id: new UntypedFormControl(undefined),
      insertDate: new UntypedFormControl(undefined),
      name: new UntypedFormControl(undefined, [Validators.required]),
      surname: new UntypedFormControl(undefined, [Validators.required]),
      email: new UntypedFormControl(undefined, [Validators.required]),
      phone: new UntypedFormControl(undefined, [Validators.required]),
      city: new UntypedFormControl(undefined,),
      message: new UntypedFormControl(undefined, [Validators.required]),
      privacy: new UntypedFormControl(undefined, [Validators.required]),
      originId: new UntypedFormControl(undefined, [Validators.required]),
      privacy2: new UntypedFormControl(undefined,),
    });
    // this.enableAllControls(false);
    this.readOnlyAllControls(true);
  }

  public override async onModelReady(): Promise<void> {
    this.formGroup.controls['insertDate'].setValue(this.model?.insertDateFormat());
  }

  override async buildModel(formValue: any): Promise<void> {
    if (this.model) {
      this.model.id = formValue.id;
      this.model.name = formValue.name;
      this.model.surname = formValue.surname;
      this.model.email = formValue.email;
      this.model.phone = formValue.phone;
      this.model.city = formValue.city;
      this.model.message = formValue.message;
      this.model.privacy = formValue.privacy;
      this.model.privacy2 = formValue.privacy2;
    }
  }

  public override back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
