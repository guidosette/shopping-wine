import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouBaseComponent } from './thank-you-base.component';

describe('ThankYouBaseComponent', () => {
  let component: ThankYouBaseComponent;
  let fixture: ComponentFixture<ThankYouBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
