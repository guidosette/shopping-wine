import * as firestore from "@google-cloud/firestore";
import { FirestoreCollectionBase } from "../FirebaseFunctionsLib/models/base/firestore-collection-base";


export class Section extends FirestoreCollectionBase {
  static SectionDefaultID: string = "DEFAULT";

  getNewInstance(snapshot?: firestore.DocumentSnapshot): FirestoreCollectionBase {
    return new Section(snapshot);
  }

  GetNameCollection(): string {
    return 'sections';
  }

  name?: string;
  sigla?: string;
 

  constructor(snapshot?: firestore.DocumentSnapshot | firestore.DocumentData | null) {
    super(snapshot);
  }

  public setData(snapshot: firestore.DocumentSnapshot): FirestoreCollectionBase {
    super.setData(snapshot);
    const json = this.getJson(snapshot);
    if (json) {
      this.name = json["name"];
      this.sigla = json["sigla"];
    }
    return this;
  }

  public getDocumentData(id?: string): any {
    var obj = super.getDocumentData(id);

    if (this.name) {
      obj['name'] = this.name;
    }
    if (this.sigla) {
      obj['sigla'] = this.sigla;
    }

    return obj;
  }

  public getName(): string {
    return this.name ? this.name : '';
  }

  static getIcon(): string {
    return 'category';
  }

}
