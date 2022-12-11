import { Component, OnInit } from '@angular/core';
import { SiteModule } from '../../site.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  SiteModule = SiteModule;

  constructor() { }

  ngOnInit(): void {
  }

}
