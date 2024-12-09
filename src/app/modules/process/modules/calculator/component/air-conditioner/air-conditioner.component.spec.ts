import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirConditionerComponent } from './air-conditioner.component';

describe('AirConditionerComponent', () => {
  let component: AirConditionerComponent;
  let fixture: ComponentFixture<AirConditionerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AirConditionerComponent]
    });
    fixture = TestBed.createComponent(AirConditionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
