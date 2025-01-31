import { Component, Inject, inject } from '@angular/core';
import { SupplierListComponent } from '../../../components/supplier-list/supplier-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Supplier } from '../../../models/supplier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierDataSource } from '../../../services/supplier.data.source.service';

@Component({
  selector: 'app-add.dialog',
  standalone: false,
  
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent {

  supplierForm: FormGroup;

  constructor(
      private fb: FormBuilder,
    
    
      ){
      this.supplierForm = this.fb.group({
        supplierName: ['', Validators.required],
        uniqueIdentifer: [''],
        adresse: [''],
        mainContact: [''],
        email: ['', [Validators.email, Validators.required]],
        phoneNumber: [''],
        supplierType: [''],
        paymentMethods: [''],
        paymentTerms: ['']
    }); 

  }
  


  readonly dialogRef = inject(MatDialogRef<SupplierListComponent>);
  supplierDataSource = inject(SupplierDataSource);

  addSupplier()
  {

    const supplier = this.supplierForm.value;
    this.supplierDataSource.addSupplier(supplier).subscribe({
      next: (response) => {
        console.log('Supplier added successfully', response);
      },
      error: (error) => {
        console.error('Error adding supplier', error);
      },
    });
    
  }
}
