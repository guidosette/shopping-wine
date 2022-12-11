import { Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OriginBase } from 'src/app/FirebaseBackofficeLib/backoffice-lib/origin-base/origin-base';
import { OriginBaseManager, OriginBaseManagerParams } from 'src/app/FirebaseBackofficeLib/backoffice-lib/origin-base/origin-base-manager';
import { BaseListParams } from 'src/app/FirebaseBackofficeLib/utils/components/base-list/base-list.component';
import { FirestoreManagerBase } from 'src/app/FirebaseBackofficeLib/utils/firebase/managers/firestore-manager-base';
import { TagManagerService } from 'src/app/FirebaseBackofficeLib/utils/managers/tag-manager-service.service';
import { SiteBaseComponent } from 'src/app/PaUtils/component/site-base.component';
import { IPaNavigationMenuItem } from 'src/app/PaUtils/section/pa-navigation/pa-navigation.component';
import { SiteService, SiteServiceData } from '../site.service';
import { BaseSharedComponent } from '../shared/base-shared.component';

@Component({
  selector: 'app-base-site',
  templateUrl: './base-site.component.html',
  styleUrls: ['./base-site.component.scss']
 
})
export class BaseSiteComponent extends BaseSharedComponent implements OnInit {

  public siteServiceData?: SiteServiceData;
  public siteMenu: IPaNavigationMenuItem[] = [];

  constructor(
    injector: Injector,
    protected override router: Router, protected override route: ActivatedRoute,
    private tagManagerService: TagManagerService,
    private _renderer2: Renderer2,
    protected siteService: SiteService,
    protected originBaseManager: OriginBaseManager,
    ) {
    super(injector, router, route);
    this.siteServiceData = new SiteServiceData();
    this.siteService.siteObservable.subscribe((data: SiteServiceData) => {
      this.siteServiceData = data;
    });
    // this.tagManagerService.setUpAnalytics();        
   }


   override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    await this.setMenu();
    // this.setIubenda();
  }

  override async ngAfterViewInit() {
    super.ngAfterViewInit();
    this.setIubenda();
  }

  setIubenda() {
    // COOKIE SOLUTION IUBENDA
    var data = `
    var _iub = _iub || [];
    _iub.csConfiguration = {"consentOnContinuedBrowsing":false,"floatingPreferencesButtonCaptionColor":"#FFFFFF00","floatingPreferencesButtonColor":"#FFFFFF","floatingPreferencesButtonDisplay":"bottom-left","invalidateConsentWithoutLog":true,"perPurposeConsent":true,"siteId":248420,"whitelabel":false,"cookiePolicyId":273593,"lang":"it", "banner":{ "acceptButtonCaptionColor":"#FFFFFF","acceptButtonColor":"#EA661D","acceptButtonDisplay":true,"backgroundColor":"#FFFFFF","brandBackgroundColor":"#EA661D","closeButtonDisplay":false,"customizeButtonCaptionColor":"#4D4D4D","customizeButtonColor":"#DADADA","customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"logo":"https://powerapp.it/assets/img/logo.png","position":"float-bottom-left","rejectButtonCaptionColor":"#FFFFFF","rejectButtonColor":"#EA661D","rejectButtonDisplay":true,"textColor":"#4D4D4D" }};
    `
    this.iubendaService.addIubenda(this._renderer2, data);

  }

  async setMenu() {
    var params = new BaseListParams<OriginBase>(undefined, undefined, "order", FirestoreManagerBase.orderAscKey);
    // this.translateManager.getCurrentLang()
    var origins = await this.originBaseManager.getListPromise(new OriginBaseManagerParams(params, undefined, undefined, true));
    this.siteMenu = [];
    origins.forEach((origin: OriginBase, index: number) => {
      this.siteMenu.push(
        {
          label: origin.menuName!,
          href: `/${origin.slug}`
        },
      );
    });
  }

}
