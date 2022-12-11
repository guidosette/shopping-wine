import * as firestore from "@google-cloud/firestore";
import { FirestoreCollectionBase } from "../FirebaseFunctionsLib/models/base/firestore-collection-base";

export class Tag extends FirestoreCollectionBase {

  getNewInstance(snapshot?: firestore.DocumentSnapshot): FirestoreCollectionBase {
    return new Tag(snapshot);
  }

  GetNameCollection(): string {
    return 'tags';
  }

  name?: string;
 
  constructor(snapshot?: firestore.DocumentSnapshot | firestore.DocumentData | null) {
    super(snapshot);
  }

  public setData(snapshot: firestore.DocumentSnapshot): FirestoreCollectionBase {
    super.setData(snapshot);
    const json = this.getJson(snapshot);
    if (json) {
      this.name = json["name"];
    }
    return this;
  }

  public getDocumentData(id?: string): any {
    var obj = super.getDocumentData(id);

    if (this.name) {
      obj['name'] = this.name;
    }

    return obj;
  }

  public getName(): string {
    return this.name ? this.name : '';
  }

  static getIcon(): string {
    return 'tag';
  }

}
