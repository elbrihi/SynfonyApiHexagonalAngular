import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VediosComponent } from './vedios.component';

describe('VediosComponent', () => {
  let component: VediosComponent;
  let fixture: ComponentFixture<VediosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VediosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
