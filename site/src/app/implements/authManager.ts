import { Injectable, Injector } from '@angular/core';
import { AuthBaseManager } from '../FirebaseBackofficeLib/utils/firebase/managers/authBaseManager';
import { Customer } from './customer';

@Injectable({
	providedIn: 'root'
})
export class AuthManager extends AuthBaseManager<Customer> {

	constructor(public override injector: Injector) {
		super(injector);
	}

}
