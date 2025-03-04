import { Component, Inject, inject, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierDataSource } from '../../../services/supplier.data.source.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Supplier } from '../../../models/supplier';

@Component({
  selector: 'app-supplierupdate',
  standalone: false,
  
  templateUrl: './supplier.update.component.html',
  styleUrl: './supplier.update.component.scss'
})
export class SupplierUpdateComponent {

  supplierForm: FormGroup;
  supplierDetails = signal<Supplier | null>(null);
  constructor( private fb: FormBuilder,
     public dialogRef: MatDialogRef<SupplierUpdateComponent>,
     @Inject(MAT_DIALOG_DATA) public supplier: Supplier,

  ){

    this.fb.group([

    ])
    console.log(supplier)
    this.supplierForm = this.fb.group({
        supplierName: ['', Validators.required],
        uniqueIdentifer: [''],
        adress: [''],
        mainContact: [''],
        email: ['', [Validators.email, Validators.required]],
        phoneNumber: [''],
        supplierType: [''],
        paymentMethods: [''],
        paymentTerms: ['']
    })

  }
  private supplierDataSource = inject(SupplierDataSource);
  ngOnInit(): void
  {
      this.supplierDataSource.getSupplierById(this.supplier.id).subscribe(supplier => {
        this.supplierDetails.set(supplier)

        // Update form values when data is available
        if (supplier) {
          this.supplierForm.patchValue({
            id: supplier.id,
            supplierName: supplier.supplierName,
            uniqueIdentifer: supplier.uniqueIdentifer,
            adress: supplier.adress,
            mainContact: supplier.mainContact,
            email: supplier.email,
            phoneNumber: supplier.phoneNumber,
            supplierType: supplier.supplierType,
            paymentMethods: supplier.paymentMethods,
            paymentTerms: supplier.paymentTerms
          });
        }
      })
  }
  updateSupplier()
  {
     
    this.supplierDataSource.updateSupplier(this.supplier.id, this.supplierForm.value)
      .subscribe({
        next: () => {
          console.log('Supplier updated successfully!');
          this.dialogRef.close(true); // Close dialog and return success flag
        },
        error: (err) => {
          console.error('Error updating supplier:', err);
          alert('Error updating supplier. Please try again.'); // Or use a snackbar
        }
    });
  }
}
