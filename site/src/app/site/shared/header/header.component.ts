import { Component, Injector, OnInit } from '@angular/core';
import { PaHeaderComponent } from 'src/app/PaUtils/section/pa-header/pa-header.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends PaHeaderComponent {

  constructor(injector: Injector) {
    super(injector); 
  }

}
