import { Injector } from '@angular/core';
import { ExcelBase } from 'src/app/FirebaseBackofficeLib/utils/models/excelBase';
import { Contact } from './contact';


export class ContactExcel extends ExcelBase {

  nome?: string;
  cognome?: string;
  email?: string;
  telefono?: string;
  città?: string;
  privacy?: boolean;
  provenienza?: string;
  messaggio?: string;
  // privacy2?: boolean;

  constructor(contact: Contact,
  ) {
    super(contact);
    this.setData(contact);
  }

  public async setData(contact: Contact) {
    this.nome = contact.name;
    this.cognome = contact.surname;
    this.email = contact.email;
    this.telefono = contact.phone;
    this.città = contact.city;
    this.privacy = contact.privacy;
    this.provenienza = contact.getNameOrigin();
    this.messaggio = contact.message;
    // this.privacy2 = contact.privacy2;


    return this;
  }

  async setDataAsync(contact: Contact, injector: Injector): Promise<ContactExcel> {
    return new Promise(async (resolve, reject) => {


      resolve(this);

    });
  }

}