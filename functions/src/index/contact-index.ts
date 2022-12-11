import * as functions from "firebase-functions";
import { ACContact } from "../FirebaseFunctionsLib/models/activeCampaignApi/ACContact";
import { ContactManager } from "../manager/contact-manager";
import { Contact } from "../models/contact";
import { AdminManager } from "../admin";

import "reflect-metadata";
import { Container } from "typedi";
import { ACCustomField, ActiveCampaignManager } from "../FirebaseFunctionsLib/managers/activeCampaignManager";
import { ContactVD } from "../FirebaseFunctionsLib/models/contactVD";
import { OriginBaseManager } from "../FirebaseFunctionsLib/managers/firestore/originBaseManager";
import { VDManager } from "../FirebaseFunctionsLib/managers/vdManager";

const admin = Container.get(AdminManager);
const collectionName = new Contact().GetNameCollection();
const contactManager = Container.get(ContactManager);
const activeCampaignManager = Container.get(ActiveCampaignManager);
const vdManager = Container.get(VDManager);
const originBaseManager = Container.get(OriginBaseManager);

export const onContactCreate = functions
    .region(admin.getRegionName())
    .firestore.document(`${collectionName}/{documentId}`)
    .onCreate(async (snap, context) => {
      const document = snap.data();
      const id = document.id;
      await contactCreateFunc(id, new Contact(document));
    });

export async function contactCreateFunc(documentId: string, document?: Contact): Promise<void> {
  if (!document) {
    document = (await contactManager.getDetail(documentId))!;
  }

  // get origin
  const origin = await originBaseManager.getDetailByOriginBaseEnum(document!.originId!);

  if (origin.acListId !== undefined && origin!.acListId !== null) {
    //AC
    const contactAC = new ACContact();
    contactAC.email = document.email;
    contactAC.firstName = document.name;
    contactAC.lastName = document.surname;
    // contact.companyName = document.companyName;
    contactAC.phone = document.phone;

    const fields: ACCustomField[] = [];
    fields.push(new ACCustomField("Messaggio", document.message));
    const result = await activeCampaignManager.sendContactToActiveCampaign(contactAC, origin!.acListId!, origin!.acTagName!, fields); // demo
    console.log("result AC", result);
  }

  if (origin.customerIDAppVD) {
    // VD
    const opportunitaName = `${origin.name}`;

    const contactVD = new ContactVD();
    contactVD.email = document.email;
    contactVD.name = document.name;
    contactVD.surname = document.surname;
    contactVD.phone = document.phone;
    // contactVD.companyName = document.companyName;

    // contactVD.origin = document.phone;
    contactVD.sector = opportunitaName;
    contactVD.comment = `Messaggio: ${document.message}`;
    const opportunità = `${contactVD.sector}`;

    // console.log("contactVD", contactVD);

    // const customerId = "jcPyJBZ5bgdnTWyuT6vaqNRWri62"; // demo -> Guido Fanfani
    const customerId = origin.customerIDAppVD;
    await vdManager.insertContactIntoVD(customerId, contactVD, opportunità);
  }
}
