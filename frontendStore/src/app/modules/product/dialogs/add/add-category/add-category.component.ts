import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryDataSourceService } from '../../../services/category.data.source.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-add-category',
  standalone: false,
  
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {


  categoryForm: FormGroup;
  categoryDataSource = inject(CategoryDataSourceService)
  private category?: Category;

  constructor(
     private fb: FormBuilder,
  )
  {
    this.categoryForm = this.fb.group({
      categories: this.fb.array([]), // Initialize an empty FormArray
    });
  }
  saveCategory(event: Event){
  
   
    event.preventDefault();

    const category: Category = 
        { categoryName: this.categoryForm.value.categoryName,
          categoryStatus: true
    };

    this.categoryDataSource.postCategory(category).subscribe({
      
      next: (response) => {
        console.log('Category added successfully', response);
      },
      error: (error) => {
        console.error('Error adding category', error);
      },
    });
  }
  get categories(): FormArray {
    return this.categoryForm.get('categories') as FormArray;
  }
  // Method to add a new category input
  addCategory(): void {
    this.categories.push(this.createCategory());
  }

  // Method to remove a category input
  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  // Method to submit form
  saveCategories(event: Event): void {
    event.preventDefault();
    console.log(this.categoryForm.value.categories);


    this.categoryDataSource.postCategory(this.categoryForm.value.categories).subscribe({
      next: (response) => {
        console.log('Supplier added successfully', response);
      },
      error: (error) => {
        console.error('Error adding supplier', error);
      },
    });
  }  // Method to create a new category form group
 
  private createCategory(): FormGroup {
    return this.fb.group({
      categoryName: ['', Validators.required],
      categoryStatus: [true], // Default to true
    });
  }


}
