import "reflect-metadata";
import { Container, Service } from "typedi";
import { AdminBaseManager } from "./FirebaseFunctionsLib/managers/adminBase";
import { Content } from "./models/content";
import * as functions from "firebase-functions";
import { ContentManager } from "./manager/content-manager";
import { SectionManager } from "./manager/section-manager";
import { TagManager } from "./manager/tag-manager";
import { VDApiCallType } from "./FirebaseFunctionsLib/managers/vdManager";
import { EmailConfigurationType } from "./FirebaseFunctionsLib/managers/emailManager";

@Service({ global: true })
export class AdminManager extends AdminBaseManager {

  protected contentManager!: ContentManager;
  protected tagManager!: TagManager;
  protected sectionManager!: SectionManager;
  
  constructor() {
    super("shopping-wine");
    setTimeout(() => {
      this.contentManager = Container.get(ContentManager);
      this.tagManager = Container.get(TagManager);
      this.sectionManager = Container.get(SectionManager);
    }, 0);
  }

  getAdminEmail(): string {
    return "sviluppo@powerapp.it";
  }

  getPrimaryColor() {
    return "a83271";
  }

  public getActiveCampaignAccountName(): string {
    // return "powerapp25694"; // prod
    return "venditoredigitaledemo"; // demo
  }

  public getActiveCampaignToken(demo?: boolean): string {
    // return "029f02c68b76ff14a597a170754a62caf4bb813c4642885feb2fef015f5133238cec659c"; // prod
    return "b16923086b1e71ea930d2e0b73ce835b4193471963de37583b4493d1e0d4f5c991d08c92"; // demo
  }

  getVDApiCallType(): VDApiCallType { // ApiCallType
    return VDApiCallType.Prod; // 0 local_demo, 2 demo, 3 Prod
  }

  getSitemapDynamic(): any[] { // SitemapDynamic
    return [
      // { nameCollection: "collections", baseUrl: "site" },
    ];
  }

  getBaseUrlSite(): string {
    if (this.isDemo()) {
      return "https://lp-start-kit.web.app/";
    }
    return "https://shopping-wine.web.app/";
  }

  // Cloud Build -> Modifica Trigger -> show preview webhook
  cloudBuildKeyTrigger(): string {
    // TODO
    return "AIzaSyAkXaZV69O0uQa_BwyVqY9fo9adQtILvrw";
  }
  cloudBuildSecretTrigger(): string {
    // TODO
    return "AxXuFF7O_FS-yMP5GzxRAuZFYlB2dbOh";
  }

  getSeoCollections(): string[] {
    return ["origins"];
  }

}
