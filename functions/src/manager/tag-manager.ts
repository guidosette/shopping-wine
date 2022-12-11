
import * as firestore from "@google-cloud/firestore";
import { FirestoreManagerBase } from "../FirebaseFunctionsLib/models/base/firestore-manager-base";
import { Tag } from "../models/tag";

import "reflect-metadata";
import { Container, Service } from "typedi";

@Service({ global: true })
export class TagManager extends FirestoreManagerBase<Tag> {
  getInstanceModel(): Tag {
    return new Tag();
  }
  getNewModel(data: firestore.QueryDocumentSnapshot<firestore.DocumentData>): Tag {
    return new Tag(data);
  }

  constructor() {
    super();
  }
}
