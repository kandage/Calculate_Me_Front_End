import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteelQuantityComponent } from './steel-quantity.component';

describe('SteelQuantityComponent', () => {
  let component: SteelQuantityComponent;
  let fixture: ComponentFixture<SteelQuantityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SteelQuantityComponent]
    });
    fixture = TestBed.createComponent(SteelQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
