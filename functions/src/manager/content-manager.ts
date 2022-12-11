
import * as firestore from "@google-cloud/firestore";
import { Query } from "@google-cloud/firestore";
import { AdminManager } from "../admin";
import { BaseListParams } from "../FirebaseFunctionsLib/models/base/base-list-params";
import { FirestoreManagerBase } from "../FirebaseFunctionsLib/models/base/firestore-manager-base";
import { Content } from "../models/content";

import "reflect-metadata";
import { Container, Service } from "typedi";

@Service({ global: true })
export class ContentManager extends FirestoreManagerBase<Content> {
  getInstanceModel(): Content {
    return new Content();
  }
  getNewModel(data: firestore.QueryDocumentSnapshot<firestore.DocumentData>): Content {
    return new Content(data);
  }

  protected admin!: AdminManager;

  constructor() {
    super();
    setTimeout(() => {
      this.admin = Container.get(AdminManager);
    }, 0);
  }

  public getList(params?: BaseListParams<Content>, tagId?: string, sectionId?: string): Promise<Content[]> {
    return new Promise((resolve, reject) => {
      this._getList(params, tagId, sectionId).then((values) => {
        resolve(values);
      }).catch((error) => {
        console.error("getListFullObservable", error);
        reject(error);
      });
    });
  }

  protected _getList(params?: BaseListParams<Content>, tagId?: string, sectionId?: string): Promise<Content[]> {
    return new Promise(async (resolve, reject) => {
      const instance = this.getInstanceModel();
      (await this.getCollection(params, tagId, sectionId)).get().then((querySnapshot) => {
        const dataList = querySnapshot.docs.map((dataItem: firestore.QueryDocumentSnapshot) => instance.getNewInstance(dataItem) as unknown as Content);
        resolve(dataList);
      });
    });
  }
 
  public async getCollection(params?: BaseListParams<Content>, tagId?: string, sectionId?: string): Promise<Query> {
    const collection = this.admin.db.collection(this.getInstanceModel().GetNameCollection());
    var query = await this.setQueryByBaseListParams(collection, params, true);
    if (tagId != null && tagId != undefined) {
      query = query.where("tagIds", "array-contains", tagId);
    }
    if (sectionId != null && sectionId != undefined) {
      query = query.where("sectionIds", "array-contains", sectionId);
    }
    return query;
  }
  
}
