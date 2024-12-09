import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDefaultComponent } from './dashboard-default.component';

describe('DashboardDefaultComponent', () => {
  let component: DashboardDefaultComponent;
  let fixture: ComponentFixture<DashboardDefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDefaultComponent]
    });
    fixture = TestBed.createComponent(DashboardDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
