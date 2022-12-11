import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactBase } from 'src/app/FirebaseBackofficeLib/backoffice-lib/contact-base/contact-base';
import { ContactBaseExcel } from 'src/app/FirebaseBackofficeLib/backoffice-lib/contact-base/contact-base-excel';
import { ModelBaseListComponent } from 'src/app/FirebaseBackofficeLib/backoffice-lib/model-base/model-base-list.component';
import { ModelBaseManager } from 'src/app/FirebaseBackofficeLib/backoffice-lib/model-base/model-base-manager';
import { IOriginManager } from 'src/app/FirebaseBackofficeLib/interface/iOriginManager';
import { AbstractBaseList, BaseListParams } from 'src/app/FirebaseBackofficeLib/utils/components/base-list/base-list.component';
import { IBaseEnum, BaseEnum } from 'src/app/FirebaseBackofficeLib/utils/enum/base/baseEnum';
import { GeneralActiveClass, GeneralActiveEnum } from 'src/app/FirebaseBackofficeLib/utils/enum/generalActiveEnum';
import { FirestoreManagerBase, FirestoreManagerBaseParams } from 'src/app/FirebaseBackofficeLib/utils/firebase/managers/firestore-manager-base';
import { ExcelProgressCallback, ExcelService } from 'src/app/FirebaseBackofficeLib/utils/managers/excel.service';
import { Manager } from 'src/app/implements/manager';
import { OriginClass, OriginEnum } from '../../shared/originEnum';
import { Contact } from '../contact';
import { ContactExcel } from '../contact-excel';
import { ContactManager, ContactManagerParams } from '../contact-manager';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent extends AbstractBaseList<Contact> {

  // originEnum
  public set selectedOrigin(value: IBaseEnum | undefined) {
    this._selectedOrigin = value;
    this.onSelectedOrigin(value);
    if (this._selectedOrigin?.id !== BaseEnum.getAllId()) {
    }
    this.load(0);
  }

  public onSelectedOrigin(value: IBaseEnum | undefined) {
  }

  public get selectedOrigin(): IBaseEnum | undefined {
    return this._selectedOrigin;
  }

  private _selectedOrigin?: IBaseEnum;
  public originClass?: IBaseEnum[];
  

  public originManagerImpl: IOriginManager<IBaseEnum>;

  constructor(
    protected override injector: Injector,
    public contactManager: ContactManager,
    private excelSrv: ExcelService,
  ) {
    super(injector, true);
    this.originManagerImpl = injector.get(IOriginManager);

    this.columns = [
      'name',
      'email',
      'originId',
      'insertDate',
    ];

    this.orderField = 'insertDate';
    this.order = FirestoreManagerBase.orderDescKey;

    this.originManagerImpl = injector.get(IOriginManager);
    this.originClass = this.originManagerImpl.getOriginClass(true);
    this._selectedOrigin = this.originClass[0];

  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    // var generalActiveClass = new GeneralActiveClass(undefined).getList(true);
    // var generalClass = generalActiveClass.filter((v) => v.id === GeneralActiveEnum.Attivo)[0];
    // var params = new BaseListParams<Category>(undefined, undefined, "name", FirestoreManagerBase.orderAscKey);
  }

  override getParams(params: BaseListParams<Contact | null>, getAll?: boolean): FirestoreManagerBaseParams<Contact> {
    return new ContactManagerParams(params, getAll, this._selectedOrigin ? this._selectedOrigin.id as number : undefined);
  }

  override getData(params: BaseListParams<Contact | null>, getAll?: boolean): Observable<Contact[]> {
    return this.contactManager.getList(this.getParams(params, getAll));
  }

  async exportData() {
    // this.excelSrv.exportToFile('azioni', tableId);
    this.isLoading = true;

    this.loadingProgress = `Preparazione...`;

      this.currentParams!.pageSize = undefined;
     
      var excelProgressCallback: ExcelProgressCallback = (value: string) => {
        this.loadingProgress = value;
      };

      try {
        this.contactManager.getList(this.getParams(this.currentParams!, false)).subscribe(async (list: Contact[]) => {
          var results: ContactExcel[] = [];
          await this.getExcelGeneral(list, 0, null, excelProgressCallback, results);
          await this.excelSrv.exportAsExcelFile(results, 'Contatti', 'Contatti'); // ContactExcel.getHeaders()
          this.isLoading = false;
        })
      } catch (e) {
        console.error("error export excel", e);
      }

  }

  public async getExcelGeneral(values: Contact[], index: number, resolve: any, excelProgress: ExcelProgressCallback, result: ContactExcel[]): Promise<void> {
    if (resolve) {
      return await this.getExcelInner(values, index, resolve, excelProgress, result);
    } else {
      return new Promise(async (resolve2, refuse) => {
        await this.getExcelInner(values, index, resolve2, excelProgress, result);
      });
    }
  }

  public async getExcelInner(values: Contact[], index: number, resolve: any, excelProgress: ExcelProgressCallback, result: ContactExcel[]): Promise<void> {
    if (index < values.length) {
      var item = values[index];
      var n = new ContactExcel(item);
      var res = await n.setDataAsync(item, this.injector);
      result.push(res);
      // var percentual = `${(index/contacts.length*100).toFixed(0)}%`;
      var percentual = `${index}/${values.length}`;
      excelProgress(percentual);
      // console.log("this.percentual", percentual);
      index++;
      this.getExcelGeneral(values, index, resolve, excelProgress, result);
    } else {
      // finish
      resolve();
    }
  }

}
