import { Injectable, Injector } from '@angular/core';
import { TranslateManagerBase } from '../PaUtils/managers/translate-manager-base';

@Injectable({
	providedIn: 'root'
})
export class TranslateManager extends TranslateManagerBase {
	constructor(injector: Injector) {
		super(injector);
	}

	override isActive(): boolean {
		return true;
	}

	override getNameRoute(moduleName: string): string {
		// console.log("moduleName", moduleName, this.currentLang)
		// switch (this.currentLang) {
		// 	case "it":
		// 		switch (moduleName) {
		// 			case "projects":
		// 				return "progetti";
		// 			case "contacts":
		// 				return "contatti";
		// 		}
		// 		break;
		// 	case "en":
		// 		switch (moduleName) {
		// 			case "projects":
		// 				return "projects";
		// 			case "contacts":
		// 				return "contacts";
		// 		}
		// 		break;
		// }

		return moduleName;
	}

}
