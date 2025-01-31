import { Component, inject, Inject, signal } from '@angular/core';
import { Supplier } from '../../../models/supplier';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddDialogComponent } from '../../add/add.dialog/add-dialog.component';
import { SupplierDataSource } from '../../../services/supplier.data.source.service';

@Component({
  selector: 'app-supplier-details',
  standalone: false,
  
  templateUrl: './supplier-details.component.html',
  styleUrl: './supplier-details.component.scss'
})
export class SupplierDetailsComponent {
   isLoading = signal(true);
   supplierDetails = signal<Supplier | null>(null);
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public supplier: Supplier,
    
  ){

   
    console.log("hello ",this.supplierData.getSupplierById(supplier.id))
  }

  ngOnInit(): void {
    this.supplierData.getSupplierById(this.supplier.id).subscribe({
      next: (supplier) => {
        this.supplierDetails.set(supplier); // Set the supplier data
        this.isLoading.set(false); // Hide the loader
      },
      error: (err) => {
        console.error('Error fetching supplier details:', err);
        this.isLoading.set(false); // Ensure the loader hides even on error
      },
    });
  }
  supplierData = inject (SupplierDataSource)
  closeDialog(): void {
    this.dialogRef.close();
  }
  
  
}
