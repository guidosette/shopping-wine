import { Injectable, Injector } from '@angular/core';
import { AuthServiceBase } from '../FirebaseBackofficeLib/authBase.service';
import { Customer } from './customer';
import { Manager } from './manager';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthServiceBase<Customer> {

  constructor(public override injector: Injector, public _manager: Manager) {
    super(injector);
  }

  override superAdminRoutes(): string[] {
    return [];
  }


}
