import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryListDataSource, CategoryListItem } from './category-list-datasource';
import { CategoryDataSourceService } from '../../services/category.data.source.service';
import { Category } from '../../models/category.model';
import { UpdateCategoryComponent } from '../../dialogs/update/update-category/update-category.component';
import { AddCategoryComponent } from '../../dialogs/add/add-category/add-category.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  standalone: false,
  

})
export class CategoryListComponent implements AfterViewInit  , OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoryListItem>;
  dataSource = new CategoryListDataSource();
  categoeyDataSource = inject(CategoryDataSourceService)
  categories: any[] = []
  listCategories = new MatTableDataSource<any>()
  dialog = inject(MatDialog)

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'categoryName','actions'];
  displayedProductCulumns = ['id', 'productName','productDescription','actions'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit():void
  {
      console.log(this.loadCategories())
      this.loadCategories()
  }

  loadCategories()
  {
     this.categoeyDataSource.getCategories().subscribe({
      next:(response: any) =>{
        
        this.categories = response["hydra:member"];
        this.listCategories = new MatTableDataSource(this.categories)
        this.listCategories.paginator = this.paginator
        this.listCategories.sort = this.sort 
        
      },
      error: (err) => console.error('Error fetching categories:', err)
      
     });
  }

  tab(element:any)
  {

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
}