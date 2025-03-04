import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface SubPeriodicElement {
  subName: string;
  detail: string;
}

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  subElements?: SubPeriodicElement[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',
            subElements: [{ subName: 'Isotope H-1', detail: 'Stable' }] },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',
            subElements: [{ subName: 'Isotope He-3', detail: 'Rare' },{ subName: 'Isotope He-3', detail: 'Rare' }] },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },

];

@Component({
  selector: 'app-datatable-tuto',
  templateUrl: './datatable-tuto.component.html',
  styleUrl: './datatable-tuto.component.scss',
  standalone: false
})
export class DatatableTutoComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  expandedElements: PeriodicElement[] = [];
  @ViewChild('paginatorMain') paginatorMain!: MatPaginator;
  @ViewChild('paginatorInner') paginatorInner!: MatPaginator;
  toggleRow(element: PeriodicElement,displayedColumns:any) {

    console.log("hello",element,displayedColumns)
    const index = this.expandedElements.indexOf(element);
    if (index === -1) {
      this.expandedElements.push(element);
    } else {
      this.expandedElements.splice(index, 1);
    }
  }

  isExpanded(element: PeriodicElement): boolean {
    return this.expandedElements.includes(element);
  }
  expan(row:any){

    console.log("hi")
  }
  
}
