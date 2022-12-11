import { Injectable, Injector } from '@angular/core';
import { RoleClass } from '../backoffice/shared/roleEnum';
import { IRoleManager } from '../FirebaseBackofficeLib/interface/iRoleManager';

@Injectable({
	providedIn: 'root'
})
export class RoleManagerImpl implements IRoleManager<RoleClass> {
	constructor(public injector: Injector) {
	}

	getRoleClass(withAll: boolean): RoleClass[] {
		return new RoleClass(undefined).getList(withAll) as RoleClass[];
	}

	getNameRole(roleId: number): string {
		return new RoleClass(roleId).getName();
	}

	getRoleStyle(roleId: number) {
		return new RoleClass(roleId).getStyle();
	}


}
