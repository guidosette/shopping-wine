import { Injectable, Injector } from '@angular/core';
import { OriginClass } from '../backoffice/shared/originEnum';
import { OriginBaseManagerImpl } from '../FirebaseBackofficeLib/utils/firebase/managers/OriginBaseManagerImpl';

@Injectable({
	providedIn: 'root'
})
export class OriginManagerImpl extends OriginBaseManagerImpl<OriginClass> {
	constructor(public override injector: Injector) {
		super(injector);
	}
	override getOriginClass(withAll?: boolean): OriginClass[] {
		return new OriginClass(undefined).getList(withAll) as OriginClass[];
	}

	public override getNameOrigin(originId: number): string {
		return new OriginClass(originId).getName();
	}

	public override getOriginStyle(originId: number) {
		return new OriginClass(originId).getStyle();
	}

	override showAC(): boolean {
		return false;
	}

	override showSEO(): boolean {
		return true;
	}

	override showVD(): boolean {
		return false;
	}
	
	override showHeaderSite(): boolean {
		return true;
	}
	
	override showLanguages(): boolean {
		return false;
	}

}
