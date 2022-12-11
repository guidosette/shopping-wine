import { Injectable, Injector } from '@angular/core';
import { AngularFirestoreCollection, Query } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { QueryConstraint, where } from 'firebase/firestore';
import { ModelBaseManager, ModelBaseManagerParams } from 'src/app/FirebaseBackofficeLib/backoffice-lib/model-base/model-base-manager';
import { BaseListParams } from 'src/app/FirebaseBackofficeLib/utils/components/base-list/base-list.component';
import { BaseEnum } from 'src/app/FirebaseBackofficeLib/utils/enum/base/baseEnum';
import { GeneralActiveClass, GeneralActiveEnum } from 'src/app/FirebaseBackofficeLib/utils/enum/generalActiveEnum';
import { FirestoreManagerBase, FirestoreManagerBaseParams } from 'src/app/FirebaseBackofficeLib/utils/firebase/managers/firestore-manager-base';
import { OriginClass } from '../shared/originEnum';
import { Contact } from './contact';

export class ContactManagerParams extends FirestoreManagerBaseParams<Contact> {
  override params?: BaseListParams<Contact>;
  originId?: number;

  constructor(params?: BaseListParams<Contact | null>, getAll?: boolean, originId?: number) {
    super(params, getAll);
    this.originId = originId;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContactManager extends FirestoreManagerBase<Contact> {

  getInstanceModel(): Contact {
    return new Contact();
  }
  getNewModel(data: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>): Contact {
    return new Contact(data);
  }

  constructor(
    injector: Injector) {
    super(injector);
  }

  public override getCollection(params?: ContactManagerParams): AngularFirestoreCollection<Contact> {
    const collection = this.firestore.collection<Contact>(this.getInstanceModel().GetNameCollection(), ref => {
      let query: Query = ref;

      if (params?.originId != null && params?.originId !== BaseEnum.getAllId()) {
        query = query.where('originId', '==', params?.originId);
      }

      query = this.setQueryByBaseListParams(query, params, true);
      return query;
    });
    return collection;
  }


  public override getFilters(params?: ContactManagerParams, forceFillModel?: boolean): QueryConstraint[] {
    let filters: QueryConstraint[] = [];
    filters.push(where('active', '==', true));
    filters = this.setBaseFilters(filters, params, true)

    if (params?.originId != null) {
      filters.push(where("originId", "==", params?.originId));
    }

    // filters = this.setBaseFilters(filters, params, true)
    return filters;
  }

}
