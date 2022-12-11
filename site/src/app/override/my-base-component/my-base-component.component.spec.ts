import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBaseComponent } from './my-base-component.component';

describe('BaseComponentComponent', () => {
  let component: MyBaseComponent;
  let fixture: ComponentFixture<MyBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
