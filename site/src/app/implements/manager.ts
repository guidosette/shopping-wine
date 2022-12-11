import { Inject, Injectable, Injector } from '@angular/core';
import { ManagerBase } from '../FirebaseBackofficeLib/managerBase';
import { PaFirebaseBackofficeConfig } from '../FirebaseBackofficeLib/pa-firebase-backoffice-config';
import { Customer } from './customer';
// import firebase.default from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class Manager extends ManagerBase<Customer> {

  getNewModel(data?: firebase.default.firestore.DocumentSnapshot<firebase.default.firestore.DocumentData>): Customer {
    return new Customer(data);
  }

  constructor(public override injector: Injector, @Inject(PaFirebaseBackofficeConfig) public override _config: 
  PaFirebaseBackofficeConfig<Customer>) {
    super(injector, _config);
  }

}
