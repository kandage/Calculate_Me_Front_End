import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodFrameComponent } from './wood-frame.component';

describe('WoodFrameComponent', () => {
  let component: WoodFrameComponent;
  let fixture: ComponentFixture<WoodFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WoodFrameComponent]
    });
    fixture = TestBed.createComponent(WoodFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
