import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export class SiteServiceData {
  public footerShow: boolean;
  public headerShow: boolean;
  public hrefLogoThis: boolean;
  public showPreFooter: boolean;

  constructor(footerShow: boolean = true, headerShow: boolean = true, hrefLogoThis: boolean = false, showPreFooter: boolean = false) {
    this.footerShow = footerShow;
    this.headerShow = headerShow;
    this.hrefLogoThis = hrefLogoThis;
    this.showPreFooter = showPreFooter;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  public siteObservable: Observable<SiteServiceData>;
  private siteObserver?: Observer<SiteServiceData>;

  constructor() {
    this.siteObservable = new Observable<SiteServiceData>(observer => {
      this.siteObserver = observer;
    });
  }

  setData(data: SiteServiceData) {
    if (!this.siteObserver) {
      return;
    }
    this.siteObserver!.next(data);
  }

}
