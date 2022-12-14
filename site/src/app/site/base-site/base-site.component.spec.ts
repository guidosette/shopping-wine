import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSiteComponent } from './base-site.component';

describe('BaseSiteComponent', () => {
  let component: BaseSiteComponent;
  let fixture: ComponentFixture<BaseSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
