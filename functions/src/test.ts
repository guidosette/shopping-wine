import * as functions from "firebase-functions";
// import { ContactManager } from "./manager/contact-manager";
// import * as email from "./lib/utils/email";
import { ContentManager } from "./manager/content-manager";

import "reflect-metadata";
import Container from "typedi";
import { AdminManager } from "./admin";
import { createSuperAdmin, welcomeEmail } from "./FirebaseFunctionsLib/index/customer-index";
import { CustomerBase } from "./FirebaseFunctionsLib/models/customerBase";
const admin = Container.get(AdminManager);
const contentManager = Container.get(ContentManager);

export const callTest = functions
    .region(admin.getRegionName())
    .https.onRequest(async (request, response) => {
      // console.log("Hello logs!", { structuredData: true });
      try {
        // await backupFirestore();
        await createSuperAdmin();
        // await scheduleBackup.cleanOldBackupFirestore();

        //  await email.sendEmailError("test", "test");
        // await email.sendEmail("guido.fanfani7@gmail.com", "test oggetto", "test", null, null, false);

        // await writeSitemap();

        // await welcomeEmail("aYZQERVsJ2aOvRNFg8GPsDDIJ0g1")
        response.send("ok");
        // response.send(JSON.stringify(result));
      } catch (e) {
        console.error(`Test error e: ${e}`);
        response.send(`Test error e: ${e}`);
      }
    });
