import { FirestoreCollectionBase } from "../FirebaseBackofficeLib/utils/firebase/models/firestore-collection-base";
import { CustomerBase } from "../FirebaseBackofficeLib/utils/models/customerBase";

export class Customer extends CustomerBase {

  override getNewInstance(snapshot?: firebase.default.firestore.DocumentSnapshot): FirestoreCollectionBase {
    return new Customer(snapshot);
  }


  constructor(snapshot?: firebase.default.firestore.DocumentSnapshot) {
    super(snapshot);
    if (snapshot) {
      this.setData(snapshot);
    }
  }

  public override setData(snapshot: firebase.default.firestore.DocumentSnapshot): FirestoreCollectionBase {
    super.setData(snapshot);
    const json = this.getJson(snapshot);
    if (json) {
    }
    return this;
  }

  public override getDocumentData(id?: string): any {
    var obj = super.getDocumentData(id);

    return obj;
  }
}
