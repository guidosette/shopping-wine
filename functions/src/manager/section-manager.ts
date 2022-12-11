
import * as firestore from "@google-cloud/firestore";
import { FirestoreManagerBase } from "../FirebaseFunctionsLib/models/base/firestore-manager-base";
import { Section } from "../models/section";

import "reflect-metadata";
import { Container, Service } from "typedi";

@Service({ global: true })
export class SectionManager extends FirestoreManagerBase<Section> {
  getInstanceModel(): Section {
    return new Section();
  }
  getNewModel(data: firestore.QueryDocumentSnapshot<firestore.DocumentData>): Section {
    return new Section(data);
  }

  constructor() {
    super();
  }
}
