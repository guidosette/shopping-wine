import * as firestore from "@google-cloud/firestore";
import { FirestoreCollectionBase } from "../FirebaseFunctionsLib/models/base/firestore-collection-base";

export class Contact extends FirestoreCollectionBase {
  constructor(snapshot?: firestore.DocumentSnapshot | firestore.DocumentData | null) {
    super(snapshot);
  }

  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  message?: string;
  originId?: number;

  getNewInstance(snapshot?: firestore.DocumentSnapshot): FirestoreCollectionBase {
    return new Contact(snapshot);
  }

  GetNameCollection(): string {
    return "contacts";
  }

  public setData(snapshot: firestore.DocumentSnapshot): FirestoreCollectionBase {
    super.setData(snapshot);
    const json = this.getJson(snapshot);
    if (json) {
      this.name = json.name;
      this.surname = json.surname;
      this.email = json.email;
      this.phone = json.phone;
      this.companyName = json.companyName;
      this.message = json.message;
      this.originId = json.originId;
    }
    return this;
  }

  public getDocumentData(id?: string): any {
    const obj = super.getDocumentData(id);

    if (this.name) {
      obj.name = this.name;
    }
    if (this.surname) {
      obj.surname = this.surname;
    }
    if (this.email) {
      obj.email = this.email;
    }
    if (this.phone) {
      obj.phone = this.phone;
    }
    if (this.companyName) {
      obj.companyName = this.companyName;
    }
    if (this.originId !== undefined) {
      obj.originId = this.originId;
    }

    let querySearch: any[] | null = [];
    if (this.name != null) {
      querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(this.name));
    }
    if (this.surname != null) {
      querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(this.surname));
    }
    if (this.name != null && this.surname != null) {
      querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(`${this.name} ${this.surname}`));
    }
    if (this.email != null) {
      querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(this.email));
    }
    if (querySearch != null && querySearch.length > 0) {
      obj.querySearch = this.utilsManager.getUniqueArrayForFirestore(querySearch);
    }
    return obj;
  }
}
