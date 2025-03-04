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

  constructor(){}
  categoryDataSource = inject(CategoryDataSourceService);
  dialog = inject(MatDialog);
  
  categories: Category[] = [];
  listCategories = new MatTableDataSource<Category>();

  displayedColumns = ['categoryName', 'actions'];
  productColumns = ['id', 'productName', 'productDescription', 'unitPrice', 'productTax','createdAt','modifiedAt','actions'];

  suppliers: any[] = [];
  totalItems: number = 0;
  currentProductsPage: number = 1;
  ProductsitemsPerPage: number = 5;

  ngAfterViewInit(): void {
    this.listCategories.paginator = this.paginator;
    this.listCategories.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  onPageChangeOfProducts(event:any, element:any)
  {
    console.log("element",element.id)
    
    this.ProductsitemsPerPage = event.pageSize; // Update items per page
    this.currentProductsPage = event.pageIndex + 1; // MatPaginator's pageIndex is zero-based
  }

  loadProductsForCategory(categoryId: number, page: number, pageSize: number) {
    
  }

  loadCategories(): void {
    this.categoryDataSource.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response["hydra:member"].map((category: Category) => ({
          ...category,
          expanded: false, // Ensure expanded is set to false initially
        }));
        console.log("products", this.categories[0].products?.map(product =>{

        }))
        
        this.listCategories.data = this.categories; // Update data instead of reassigning

        
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  toggleExpand(category: Category): void {

    category.expanded = !category.expanded; // Toggle expanded state
    
  }

  saveCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent);
    dialogRef.afterClosed().subscribe(() => this.loadCategories());
  }

  updateCategory(id: number): void {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      data: { id } as Category,
    });

    dialogRef.afterClosed().subscribe(() => this.loadCategories());
  }
  getSubItemsDataSource(element:any)
  {

      return new MatTableDataSource<Product>(element.products || []);
  }
  tab(element:any)
  {
      console.log(element)
  }
  td(category:any)
  {
    console.log(category)
  }
}
