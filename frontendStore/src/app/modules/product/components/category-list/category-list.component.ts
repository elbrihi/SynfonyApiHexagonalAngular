import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryListDataSource, CategoryListItem } from './category-list-datasource';
import { CategoryDataSourceService } from '../../services/category.data.source.service';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'categoryName','actions'];

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
}
