import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierUpdateComponent } from './supplier.update.component';

describe('SupplierupdateComponent', () => {
  let component: SupplierUpdateComponent;
  let fixture: ComponentFixture<SupplierUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
