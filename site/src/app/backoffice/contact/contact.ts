import { Injector } from "@angular/core";
import firebase from "firebase/compat";
import { ContactBase } from "src/app/FirebaseBackofficeLib/backoffice-lib/contact-base/contact-base";
import { ModelBase } from "src/app/FirebaseBackofficeLib/backoffice-lib/model-base/model-base";
import { FirestoreCollectionBase } from "src/app/FirebaseBackofficeLib/utils/firebase/models/firestore-collection-base";
import { UtilsLibManager } from "src/app/FirebaseBackofficeLib/utils/managers/utils-manager";
import { OriginClass } from "../shared/originEnum";


export class Contact extends ContactBase {

  override getNewInstance(snapshot?: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): FirestoreCollectionBase {
    return new Contact(snapshot);
  }

  override GetNameCollection(): string {
    return 'contacts';
  }

  constructor(snapshot?: firebase.firestore.DocumentSnapshot) {
    super(snapshot);
    if (snapshot) {
      this.setData(snapshot);
    }
  }

  public override setData(snapshot: firebase.firestore.DocumentSnapshot): FirestoreCollectionBase {
    super.setData(snapshot);
    const json = this.getJson(snapshot);
    if (json) {

    }
    return this;
  }

  public override getDocumentData(id?: string): any {
    var obj = super.getDocumentData(id);

    let querySearch: any[] | null = [];
    if (this.name != null) {
      querySearch = querySearch.concat(UtilsLibManager.setSearchParamByWords(this.name));
    }
    if (this.surname != null) {
      querySearch = querySearch.concat(UtilsLibManager.setSearchParamByWords(this.surname));
    }
    if (this.name != null && this.surname != null) {
      querySearch = querySearch.concat(UtilsLibManager.setSearchParamByWords(`${this.name} ${this.surname}`));
    }
    if (this.email != null) {
      querySearch = querySearch.concat(UtilsLibManager.setSearchParamByWords(this.email));
    }
    this.setQuerySearch(obj, querySearch);


    return obj;
  }

  public override getName(): string {
    if (this.name != null && this.surname != null) {
      return `${this.name} ${this.surname}`;
    }
    return this.name ? this.name : '';
  }

  public override haveToFillOtherModels(): boolean {
    return false;
  }

  override async fillOtherModels(injector: Injector): Promise<FirestoreCollectionBase> {
    return this;
  }

  public getNameOrigin(): string {
    return new OriginClass(this.originId).getName();
  }
  
  public getOriginStyle() {
    return new OriginClass(this.originId).getStyle();
  }

}
