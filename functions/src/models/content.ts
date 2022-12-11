import * as firestore from "@google-cloud/firestore";
import { tagmanager } from "googleapis/build/src/apis/tagmanager";
import moment = require("moment");
import { FirestoreCollectionBase } from "../FirebaseFunctionsLib/models/base/firestore-collection-base";

import { TagManager } from "../manager/tag-manager";
import { PeriodEnum } from "./enum/periodEnum";
import { Section } from "./section";
import { Tag } from "./tag";
import * as functions from "firebase-functions";
import { SectionManager } from "../manager/section-manager";


export class Content extends FirestoreCollectionBase {

  getNewInstance(snapshot?: firestore.DocumentSnapshot): FirestoreCollectionBase {
    return new Content(snapshot);
  }

  GetNameCollection(): string {
    return 'contents';
  }

  active?: boolean;
  title?: string;
  subtitle?: string;
  description?: string;
  source?: string; // fonte
  owner?: string; // proprietario
  publishDate?: Date;
  startDate?: Date;
  endDate?: Date;
  customerId?: string;

  sectionIds?: string[];
  tagIds?: string[];

  address?: string;
  lat?: number;
  lng?: number;


  // iseo
  slug?: string;

  // virtual
  sections?: Section[] = [];
  tags?: Tag[] = [];

  constructor(snapshot?: firestore.DocumentSnapshot | firestore.DocumentData | null) {
    super(snapshot);
  }

  public setData(snapshot: firestore.DocumentSnapshot): FirestoreCollectionBase {
    super.setData(snapshot);
    const json = this.getJson(snapshot);
    if (json) {
      this.active = json["active"];
      this.title = json["title"];
      this.subtitle = json["subtitle"];
      this.description = json["description"];
      this.source = json["source"];
      this.owner = json["owner"];
      this.publishDate = this.setDateFromDocumentData(json, "publishDate");
      this.startDate = this.setDateFromDocumentData(json, "startDate");
      this.endDate = this.setDateFromDocumentData(json, "endDate");
      this.customerId = json["customerId"];
      this.sectionIds = json["sectionIds"];
      this.tagIds = json["tagIds"];
      this.address = json["address"];
      this.lat = json["lat"];
      this.lng = json["lng"];

      // iseo
      this.slug = json["slug"];
    }
    return this;
  }

  public getDocumentData(id?: string): any {
    var obj = super.getDocumentData(id);

    if (this.title) {
      obj['title'] = this.title;
    }
    if (this.description) {
      obj['description'] = this.description;
    } else {
      obj['description'] = null;
    }
    if (this.source) {
      obj['source'] = this.source;
    }
    obj['active'] = this.active !== undefined ? this.active : null;
    obj['subtitle'] = this.subtitle !== undefined ? this.subtitle : null;
    obj['owner'] = this.owner !== undefined ? this.owner : null;
    obj['publishDate'] = this.publishDate !== undefined ? this.publishDate : null;
    obj['startDate'] = this.startDate !== undefined ? this.startDate : null;
    obj['endDate'] = this.endDate !== undefined ? this.endDate : null;
    obj['customerId'] = this.customerId ? this.customerId : null;
    if (this.sectionIds) {
      obj['sectionIds'] = this.sectionIds;
    }
    if (this.tagIds) {
      obj['tagIds'] = this.tagIds;
    }

    if (this.slug) {
      obj['slug'] = this.slug;
    }

    obj['address'] = this.address ? this.address : null;
    obj['lat'] = this.lat ? this.lat : null;
    obj['lng'] = this.lng ? this.lng : null;

    let querySearch: any[] | null = [];
    if (this.title != null) {
      querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(this.title));
    }
    if (this.subtitle != null) {
      querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(this.subtitle));
    }
    if (this.owner != null) {
      querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(this.owner));
    }
    if (this.source != null) {
      querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(this.source));
    }
    this.tags?.forEach((t) => {
      querySearch = querySearch!.concat(this.utilsManager.setSearchParamByWords(t.getName()));
    });
    this.sections?.forEach((t) => {
      querySearch = querySearch!.concat(this.utilsManager.setSearchParamByWords(t.getName()));
    });

    switch(this.getPeriod()) {
      case PeriodEnum.Single:
            // console.log(" Single", this.startDate, moment(this.startDate).utcOffset('+0200').format('DD/MM/YYYY'));
        querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(moment(this.startDate).utcOffset('+0200').format('DD/MM/YYYY')));
        break;
      case PeriodEnum.Period:
        querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(moment(this.startDate).utcOffset('+0200').format('DD/MM/YYYY')));
        querySearch = querySearch.concat(this.utilsManager.setSearchParamByWords(moment(this.endDate).utcOffset('+0200').format('DD/MM/YYYY')));
        break;
    }

    if (querySearch != null && querySearch.length > 0) {
      obj.querySearch = this.utilsManager.getUniqueArrayForFirestore(querySearch);
    }
    // console.log(" querySearch", obj.querySearch);

    return obj;
  }

  getPeriod() {
    return this.endDate ? PeriodEnum.Period : (this.startDate ? PeriodEnum.Single : PeriodEnum.Nothing);
  }

  public getName(): string {
    return this.title ? this.title : '';
  }

  static getIcon(): string {
    return 'inventory';
  }

  haveCustomer() {
    return this.customerId !== undefined;
  }

  isPublish() {
    return this.active;
  }

  haveMap() {
    return this.address !== null;
  }

  haveSectionDefault() {
    for(var i=0; i< this.sectionIds!.length; i++) {
      if (this.sectionIds![i] === Section.SectionDefaultID) {
        return true;
      }
    }
    return false;
  }

  async fillTags(tagManager: TagManager) {
    await Promise.all(this.tagIds!.map(async (tagId: string) => {
      this.tags?.push((await tagManager.getDetail(tagId))!);
    }));
  }

  async fillSections(sectionManager: SectionManager) {
    await Promise.all(this.sectionIds!.map(async (sectionId: string) => {
      this.sections?.push((await sectionManager.getDetail(sectionId))!);
    }));
  }
  
}
