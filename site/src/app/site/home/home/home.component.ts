import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OriginEnum } from 'src/app/backoffice/shared/originEnum';
import { BaseListParams } from 'src/app/FirebaseBackofficeLib/utils/components/base-list/base-list.component';
import { GeneralActiveClass, GeneralActiveEnum } from 'src/app/FirebaseBackofficeLib/utils/enum/generalActiveEnum';
import { FirestoreManagerBase } from 'src/app/FirebaseBackofficeLib/utils/firebase/managers/firestore-manager-base';
import { OriginHomeBaseComponent } from 'src/app/PaUtils/component/origin-home-base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends OriginHomeBaseComponent {

  constructor(
    injector: Injector,
    protected override router: Router, protected override route: ActivatedRoute,
  ) {
    super(injector, router, route);
    this.originEnum = OriginEnum.Home;

  }

  override async loadData() {
    var generalActiveClass = new GeneralActiveClass(undefined).getList(true);
    var generalClass = generalActiveClass.filter((v) => v.id === GeneralActiveEnum.Attivo)[0];
    // var paramsBase = new BaseListParams<News>(undefined, undefined, "order", FirestoreManagerBase.orderAscKey);
    // var params = new NewsManagerParams(paramsBase, undefined, undefined, generalClass);
  }

}
