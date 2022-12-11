import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBreadcrumbComponent } from './my-breadcrumb.component';

describe('MyBreadcrumbComponent', () => {
  let component: MyBreadcrumbComponent;
  let fixture: ComponentFixture<MyBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
