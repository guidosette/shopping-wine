import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteBaseComponent } from 'src/app/PaUtils/component/site-base.component';

@Component({
  selector: 'app-thank-you-base',
  templateUrl: './thank-you-base.component.html',
  styleUrls: ['./thank-you-base.component.scss']
})
export class ThankYouBaseComponent extends SiteBaseComponent {

  public eyelet = '';
  public title = 'Grazie per averci contattato!';
  public subTitle = 'A breve risponderemo con tutte le informazioni utili a soddisfare la tua richiesta<br/><br/>A presto!<br/>';

  constructor(injector: Injector,
    protected override router: Router, protected override route: ActivatedRoute,
  ) {
    super(injector, router, route);
    this.seoService.updateTitle("Grazie");
    this.seoService.setNoIndex();
    // this.siteService.setData(new SiteServiceData(true, true, false, true));
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    // this.translate = await this.translateManager.loadTranslateCustom("thanks");
    // this.seoService.updateTitle(this.translate?.thanks?.seoTitle);
    // this.title = this.translate?.thanks?.title;
    // this.subTitle = this.translate?.thanks?.subtitle;

    // var url = this.seoService.getUrlComplete();
    // if (url.includes("grazie-iscrizione-newsletter-silor")) {
    //   this.title = "Grazie per la tua iscrizione! ";
    //   this.subTitle = "";
    //   return;
    // }
  }

  // override ngOnDestroy(): void {
  //   super.ngOnDestroy();
  //   this.siteService.setData(new SiteServiceData());
  // }

}
