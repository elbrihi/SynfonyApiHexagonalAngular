import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SupplierListDataSource, SupplierListItem } from './supplier-list-datasource';
import { SupplierDataSource } from '../../services/supplier.data.source.service';
import { Supplier } from '../../models/supplier';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../../dialogs/add/add.dialog/add-dialog.component';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  standalone: false,
  styleUrls: ['./supplier-list.component.scss'] // Fixed typo: 'styleUrl' -> 'styleUrls'
})
export class SupplierListComponent implements AfterViewInit, OnInit {

  suppliers: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Supplier>;
  @ViewChild(CdkScrollable) scrollableContainer!: CdkScrollable; // Add reference to scrollable container
  @ViewChild('filter') filterInput!: any; // ViewChild for the filter input

  displayedColumns: string[] = [
    'id', 'supplierName', 'uniqueIdentifer',
    'adresse', 'mainContact', 'phoneNumber', 'supplierType', 'paymentMethods',
    'paymentTerms', 'createdAt', 'updatedAt','actions'
  ];

  listSupplier = new MatTableDataSource<any>();

  constructor(private scrollDispatcher: ScrollDispatcher) {}

  readonly dialog = inject(MatDialog);
  supplierDataSource = inject(SupplierDataSource);

  ngOnInit(): void {
    this.loadSuppliers();
  }

  public loadSuppliers(): void {
    this.supplierDataSource.getSuppliersByPagination(this.itemsPerPage, this.currentPage).subscribe({
      next: (response: any) => {
        this.suppliers = response['hydra:member']; // Extract supplier list
        this.listSupplier = new MatTableDataSource(this.suppliers);
        this.listSupplier.sort = this.sort; // Assign sort and paginator after data is loaded
        this.listSupplier.paginator = this.paginator;
        this.totalItems = response['hydra:view']?.['hydra:next']
          ? this.currentPage * this.itemsPerPage
          : this.suppliers.length; // Handle total count dynamically or add API metadata parsing
      },
      error: (err) => console.error('Error fetching suppliers:', err)
    });
  }

  ngAfterViewInit(): void {
    this.listSupplier.paginator = this.paginator;
    this.listSupplier.sort = this.sort;

    this.paginator.page.subscribe(() => {
      this.currentPage = this.paginator.pageIndex + 1;
      this.loadSuppliers();
    });

    this.sort.sortChange.subscribe(() => this.loadSuppliers());

    this.scrollDispatcher.scrolled().subscribe(() => {
      const scrollTop = this.scrollableContainer.getElementRef().nativeElement.scrollTop;
      const scrollLeft = this.scrollableContainer.getElementRef().nativeElement.scrollLeft;
      console.log('Scroll Position:', { scrollTop, scrollLeft });
    });

    // Listen for filter input changes
    this.filterInput.nativeElement.addEventListener('input', (event: any) => {

      const filterValue = event.target.value;

      
      this.applyFilter(filterValue);
    });
  }

  updateTableDataSource(): void {
    this.listSupplier.data = this.suppliers;
  }

  onPageChange(event: any): void {
    this.itemsPerPage = event.pageSize; // Update items per page
    this.currentPage = event.pageIndex + 1; // MatPaginator's pageIndex is zero-based
    this.loadSuppliers(); // Reload suppliers
  }

  onSortChange(): void {
    this.loadSuppliers();
  }

  setupFilterLogic(): void {
    this.listSupplier.filterPredicate = (data: any, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      return (
        data.id.toString().toLowerCase().includes(transformedFilter) ||
        data.supplierName?.toLowerCase().includes(transformedFilter)
      );
    };
  }

  applyFilter(filterValue: string): void {


    console.log(filterValue)
    this.listSupplier.filter = filterValue.trim().toLowerCase();
    if (this.listSupplier.paginator) {
      this.listSupplier.paginator.firstPage();
    }
  }

  openAddDialog(){


    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '600px',
      });
  
      /*dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result !== undefined) {
         
        }
      });*/
  }

  startEdit(id: number){}

  deleteItem(id: number)
  {}

  viewDetails(id: number){}
}