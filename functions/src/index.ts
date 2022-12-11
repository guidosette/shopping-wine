// import * as functions from "firebase-functions";

import { deleteAuthenticationOnCall } from "./FirebaseFunctionsLib/index/auth-index";
import { scheduledFirestoreExport } from "./FirebaseFunctionsLib/index/backup-index";
import { onCustomerCreate, procedureCreateCustomerOnCall } from "./FirebaseFunctionsLib/index/customer-index";
import { callSitemap, serveSitemap } from "./FirebaseFunctionsLib/index/sitemap-index";
import { getBase64FileCall, duplicateFileCall } from "./FirebaseFunctionsLib/index/storage-index";
import { callTest } from "./test";
import { onContactBaseCreateSimple } from "./FirebaseFunctionsLib/index/contact-base-index";
import { scheduledStartTriggerBuildCloud, startTriggerBuildCloudCall, scheduledCheckStartTriggerBuildCloud } from "./FirebaseFunctionsLib/index/cloud-build-base-index";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   console.log("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.callTest = callTest;

exports.scheduledFirestoreExport = scheduledFirestoreExport;

// Customer
exports.procedureCreateCustomerOnCall = procedureCreateCustomerOnCall;
exports.deleteAuthenticationOnCall = deleteAuthenticationOnCall;

// SiteMap
exports.serveSitemap = serveSitemap;
exports.callSitemap = callSitemap;
// exports.scheduledWriteSitemap = scheduledWriteSitemap;

// multimedia
exports.getBase64FileCall = getBase64FileCall;
// exports.getBlobFileCall = getBlobFileCall;
exports.duplicateFileCall = duplicateFileCall;

// Contact
exports.onContactCreate = onContactBaseCreateSimple

// cloud build
// exports.startTriggerBuildCloudCall = startTriggerBuildCloudCall;
// exports.scheduledStartTriggerBuildCloud = scheduledStartTriggerBuildCloud;
// exports.scheduledCheckStartTriggerBuildCloud = scheduledCheckStartTriggerBuildCloud;

// SMTP Cloud Build
// exports.handleBuildResult = handleBuildResult;

// Active Campaign
// exports.activeCampaignGeneralListsCall = activeCampaignGeneralListsCall;
// exports.activeCampaignGeneralTagsCall = activeCampaignGeneralTagsCall;
// exports.activeCampaignInfoAccountCall = activeCampaignInfoAccountCall;

// api vd
// exports.getVDCompanyByVatCall = getVDCompanyByVatCall;
// exports.getVDCompaniesCall = getVDCompaniesCall;
// exports.getVDCustomersCall = getVDCustomersCall;
// exports.appVDInfoAccountCall = appVDInfoAccountCall;