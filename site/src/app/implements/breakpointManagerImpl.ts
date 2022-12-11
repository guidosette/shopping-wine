import { Injectable, Injector } from '@angular/core';
import { BreakPointBaseManager } from '../PaUtils/managers/breakpoint-manager';

@Injectable({
	providedIn: 'root'
})
export class BreakPointManagerImpl extends BreakPointBaseManager {
	constructor(public override injector: Injector) {
		super(injector);
	}

	// protected override getBreakpoint(): string {
	// 	return "(max-width: 768px)";
	// }

}
