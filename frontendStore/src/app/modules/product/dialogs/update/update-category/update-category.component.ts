import { Component, inject, Inject, signal } from '@angular/core';
import { Category } from '../../../models/category.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryDataSourceService } from '../../../services/category.data.source.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  standalone: false,
  
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {

  categoryDataSource = inject(CategoryDataSourceService)
  categoryForm: FormGroup
  public constructor(
    public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public category: Category,
    private fb: FormBuilder
  )
  { 
      this.categoryForm = this.fb.group({
        categoryName: ['',Validators.required],
        categoryStatus: ['']
      })
  }

  categoryDetails = signal<Category | null>(null);;


  ngOnInit(): void{
      this.categoryDataSource.getCategoryById(this.category.id).subscribe((category) =>{
          this.categoryDetails.set(category)

          if(category){
          this.categoryForm.patchValue({
              id: category.id,
              categoryName: category.categoryName,
              categoryStatus: category.categoryName,
              
            })
          }

      })
  }

  saveCategoryUpdate()
  {
      this.categoryDataSource.putCategpory(this.category.id,this.categoryForm.value).subscribe({
        next: () => {
          console.log('Category updated successfully!');
          this.dialogRef.close(true); // Close dialog and return success flag
        },
        error: (err) => {
          console.error('Error updating category:', err);
          alert('Error updating category. Please try again.'); // Or use a snackbar
        }
    })
  }
  cancelUpdate()
  {
    this.dialogRef.close();
  }
}
