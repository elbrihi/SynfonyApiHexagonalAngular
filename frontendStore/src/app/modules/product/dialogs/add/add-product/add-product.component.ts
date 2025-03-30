import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SupplierDataSource } from '../../../../supplier/services/supplier.data.source.service';
import { Supplier } from '../../../../supplier/models/supplier';
import { Category } from '../../../models/category.model';
import { CategoryDataSourceService } from '../../../services/category.data.source.service';
import { Observable, of } from 'rxjs';
import { CategoryProductService } from '../../../services/category.product.service';

@Component({
  selector: 'app-add-product',
  standalone: false,
  
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  
 
})
export class AddProductComponent implements  OnInit {

  productForm: FormGroup

  
  suppliersRepo = inject(SupplierDataSource)
  categorryRepo = inject(CategoryDataSourceService)
  productRepo = inject(CategoryProductService)

  filterKeyword: string = ''; // Holds the search keyword for categories

  // Define form controls
  categoryControl = new FormControl('');
  supplierControler = new FormControl('');

  categoryFilter = new FormControl('');
  supplierFilter = new FormControl('');
  
  suppliers: Supplier[]= []
  filteredSuppliers: Supplier[] = [];
  categories: Category[]= [];
  filteredCategories: Category[] = [];
 




  constructor(private fb: FormBuilder)
  {
      this.productForm = this.fb.group({
          products: this.fb.array([this.createProductFormGroup()])
      })
  }

  ngOnInit(): void
  {
   
    this.suppliersRepo.suppliers().subscribe({

      next: (response: any)=>{

        this.suppliers = response["hydra:member"]
        this.filterSuppliers()
   
      }
    })

    this.categorryRepo.getCategories().subscribe({

      next: (response:any) =>{

        this.categories = response["hydra:member"]

        this.filterCategories()
     
      }
    })


  }

  createProductFormGroup(): FormGroup {
    return this.fb.group({
      productName: ['', Validators.required], // Add validation if needed
      productDescription: ['', Validators.required], // Add validation if needed
      unitPrice: ['', Validators.required], // Add validation if needed
      productTax: ['', Validators.required],
      supplierId: [0], // Dropdown for supplier
      categoryId: [0], // Dropdown for category
      status: [true], // Default to true
    });
  }

  removeProduct(index: number)
  {
    console.log(index)
  }
  get products(): FormArray{

    return this.productForm.get('products') as FormArray;
  }

  addProduct()
  {
    this.products.push(this.createProductFormGroup())
    
  }



  saveProducts(event: Event): any{
    
    event.preventDefault();
    
    if (this.productForm.valid) {
      const products = this.productForm.value.products.map((product: any) => ({
        ...product,
        productTax: product.productTax ? parseFloat(product.productTax) : 0, // Ensures tax is a float
        unitPrice: product.unitPrice ? parseFloat(product.unitPrice): 0
      }));
  
      console.log('Form submitted:', products);
      return this.productRepo.saveProducts(products).subscribe(
        (reponse: any) =>{
          console.log("hello subscriber")
        }
      );
    }
  }

  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category =>
      (category.categoryName as string).toLowerCase().includes(this.filterKeyword.toLowerCase())
    );
  }

  filterSuppliers():void{

    this.filteredSuppliers = this.suppliers.filter(supplier=> 

        (supplier.supplierName as string).toLowerCase().includes(this.filterKeyword.toLowerCase())

       
    )

  }
}
