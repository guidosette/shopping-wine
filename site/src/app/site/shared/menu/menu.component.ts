import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaNavigationMenuItem } from 'src/app/PaUtils/section/pa-navigation/pa-navigation.component';
import { BaseSharedComponent } from '../base-shared.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends BaseSharedComponent {

  @Input() siteMenu: IPaNavigationMenuItem[] = [];

  constructor(
    injector: Injector,
    protected override router: Router, protected override route: ActivatedRoute,
    ) {
    super(injector, router, route); 
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
  }

}
