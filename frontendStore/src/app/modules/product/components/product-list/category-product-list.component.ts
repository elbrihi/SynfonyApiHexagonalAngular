import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductListDataSource, ProductListItem } from './category-product-list-datasource';
import { Category } from '../../models/category.model';
import { CategoryProductService } from '../../services/category.product.service';
import { CategoryDataSourceService } from '../../services/category.data.source.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../../dialogs/add/add-category/add-category.component';
import { UpdateCategoryComponent } from '../../dialogs/update/update-category/update-category.component';
import { Product } from '../../models/product.service';
import { AddProductComponent } from '../../dialogs/add/add-product/add-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './category-product-list.component.html',
  styleUrl: './category-product-list.component.scss',
  standalone: false,

})
export class CategoryProductListComponent implements AfterViewInit, OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Category>;
  @ViewChild('categoryFilter') categoryFilterInput!: any; // ViewChild for the filter input
  @ViewChild('productFilter') productFilterInput!: any; // ViewChild for the filter input

  constructor(){}


  categoryDataSource = inject(CategoryDataSourceService);
  productDataSource = inject(CategoryProductService);
  dialog = inject(MatDialog);

  
  
  categories: Category[] = [];
  products: Product[] = [];

  productsData = new MatTableDataSource<Category>([]);
  listCategories = new MatTableDataSource<Category>();
  listProducts = new MatTableDataSource<Product>()

  displayedColumns = ['categoryName', 'actions'];
  productColumns = ['id', 'productName', 'productDescription', 'unitPrice', 'productTax','createdAt','modifiedAt','actions'];

  totalProductsItem: number = 0;
  currentProductsPage: number = 1;
  productsitemsPerPage: number = 5;

  totalCategoriesItem: number = 0;
  currentCategoryPage: number = 1;
  itemsCategoryPerPage: number = 5;
  

  ngAfterViewInit(): void {
    this.listCategories.paginator = this.paginator;
    this.listCategories.sort = this.sort;

    this.categoryFilterInput.nativeElement.addEventListener('input',(event:any) =>{

      const filterValue = event.target.value;
      this.applyCategoryFilter(filterValue);
  
    })

    this.productFilterInput.nativeElement.addEventListener('input',(event:any)=>{

      const filterValue = event.target.value;

      this.applyProductFilter(filterValue)
    })
  }

  ngOnInit(): void {
    
    this.loadCategories();
    
  }
  openAddProductDialog()
  {
      let dialog = this.dialog.open(AddProductComponent,{
        width: '98vw',   // 98% of the viewport width
        height: '95vh',  // 95% of the viewport height
        maxWidth: '98vw',
        maxHeight: '98vh',
        panelClass: 'full-screen-dialog' // Custom class for more styling
      
 
      })
  }
  onPageChangeOfProducts(event:any, category:any)
  {
    
    this.productsitemsPerPage = event.pageSize;
    this.currentProductsPage = event.pageIndex + 1;
  
    // Slice products based on pagination
    category.paginatedProducts = this.getPaginatedProducts(category);
    category.paginatedProducts = [...this.getPaginatedProducts(category)]; // Force a new array
    
  }



  loadCategories(): void {
    this.categoryDataSource.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response["hydra:member"].map((category: Category) => ({
          ...category,                                                                    
          expanded: false, // Ensure expanded is set to false initially                
          currentPage: 1, // Default to first page                                    
          productsItemsPerPage: 5, // Default items per page          
          paginatedProducts: this.getPaginatedProducts(category), // Paginate products
        }));
        
        
        this.listCategories.data = this.categories; // Update data instead of reassigning

        for(let i = 0 ; i < this.categories.length;i++)
        { 
          
          this.listCategories.data[i].paginatedProducts = this.getPaginatedProducts(this.categories[i]);
          
        }
     
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  /*toggleExpand(category: Category): void {

    category.expanded = !category.expanded; // Toggle expanded state
    
  }*/

  saveCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      height: '600px',
      width: '1000px',
      data: {} // Pass any necessary data (optional)
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories(); // Reload categories if a new one is added
      }
    });
  }

  updateCategory(id: number): void {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      data: { id } as Category,
    });

    dialogRef.afterClosed().subscribe(() => this.loadCategories());
  }
  onPageChange(event: any): void {
    this.itemsCategoryPerPage = event.pageSize; // Update items per page
    this.currentCategoryPage = event.pageIndex + 1; // MatPaginator's pageIndex is zero-based
    this.loadCategories(); // Reload suppliers
  }

  // Function to get paginated products from the category
  getPaginatedProducts(category: Category): Product[] {
    const startIndex = (this.currentProductsPage - 1) * this.productsitemsPerPage;
    const endIndex = startIndex + this.productsitemsPerPage;
    let categories = this.listCategories.data

    for(let i = 0; i<categories.length;i++)
    {
      
      if(categories[i].id === category.id)
      {
        
        this.listCategories.data[i] = category

      }

      //console.log(this.listCategories.data)
      
    }
    return category.products ? category.products.slice(startIndex, endIndex) : [];
  }
  
  tab(element:any)
  {                                                                                     
      console.log(element)
  }
  td(category:any)
  {
    console.log(category)
  }
  onRowClick(category: any) {

    category.products = this.getSubItemsDataSource(category);
  }

  applyProductFilter(filterValue: string): void {
    const lowerFilterValue = filterValue.toLowerCase().trim();

    this.categories.forEach(category => {
      if (category.products) {
        // Apply filter on product name or description
        category.paginatedProducts = category.products.filter(product => 
          (product.productName?.toLowerCase().includes(lowerFilterValue) || 
           product.productDescription?.toLowerCase().includes(lowerFilterValue)
          
          )
        );
      }
    });
  
    // Update the displayed data
    this.listCategories.data = [...this.categories]; // Refresh the table with updated categories
  

  }
  applyCategoryFilter(filterValue: string): void {
    this.listCategories.filter = filterValue.trim().toLowerCase();
  }
  
  getSubItemsDataSource(category: any): MatTableDataSource<Product> {
   
    this.productDataSource.getProductsByCategoryId(category.id).subscribe({
      next: (response: any) => {
        this.products = response["hydra:member"].map((category: Category) => ({
          ...category,
          expanded: false, // Ensure expanded is set to false initially
        }));
                
        this.listProducts.data = this.products; // Update data instead of reassigning
    },
      error: (err) => console.error('Error fetching categories:', err),
    })

    return this.productsData = new MatTableDataSource<Product>(this.listProducts.data || []);
  }


}
