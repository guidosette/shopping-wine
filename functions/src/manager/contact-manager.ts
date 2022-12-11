
import * as firestore from "@google-cloud/firestore";
import { FirestoreManagerBase } from "../FirebaseFunctionsLib/models/base/firestore-manager-base";
import { Contact } from "../models/contact";

import "reflect-metadata";
import { Container, Service } from "typedi";

@Service({ global: true })
export class ContactManager extends FirestoreManagerBase<Contact> {
  getInstanceModel(): Contact {
    return new Contact();
  }
  getNewModel(data: firestore.QueryDocumentSnapshot<firestore.DocumentData>): Contact {
    return new Contact(data);
  }

  constructor() {
    super();
  }
}
