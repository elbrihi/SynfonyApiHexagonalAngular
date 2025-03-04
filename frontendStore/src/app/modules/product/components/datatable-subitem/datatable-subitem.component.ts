import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Item {
  id: number;
  name: string;
  subItems?: SubItem[];
  expanded?: boolean;
}

interface SubItem {
  id: number;
  name: string;
  name1?: string;
  name2?: string;
  name3?: string;
  name4?: string;
  name5?: string;
  name6?: string;
}

@Component({
  selector: 'app-datatable-subitem',
  templateUrl: './datatable-subitem.component.html',
  styleUrls: ['./datatable-subitem.component.scss'],
  standalone:false
})
export class DatatableSubitemComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'actions'];
  displayedColumnTest: string[] = ['name','actions']; 
  subItemColumns: string[] = ['id', 'name','name1','name2','name3','name4','name5','name6'];
  
  dataSource = new MatTableDataSource<Item>([
    {
      id: 1,
      name: 'Item 1',
      subItems: [
        { id: 101, name: 'SubItem 1-1', name1: 'Subname2', 
                                        name2:'Subname3', 
                                        name3: 'Subname2 Subname2 Subname2 Subname2 Subname2Subname2',
                                        name4:'Subname2 Subname2 Subname2 Subname2 Subname2Subname2',
                                        name5:'Subname2 Subname2 Subname2 Subname2 Subname2Subname2',
                                        name6:'Subname2 Subname2 Subname2 Subname2 Subname2Subname2',
                                    
                                    },
        { id: 102, name: 'SubItem 1-2' },
      ],
      expanded: false, // Default state
    },
    {
      id: 2,
      name: 'Item 2',
      subItems: [
        { id: 201, name: 'SubItem 2-1' },
        { id: 202, name: 'SubItem 2-2' },
      ],
      expanded: false,
    },
  ]);

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleExpand(element: Item): void {
    element.expanded = !element.expanded;
    this.dataSource.data = [...this.dataSource.data]; // Force table refresh
  }

  getSubItemsDataSource(element: Item): MatTableDataSource<SubItem> {
    return new MatTableDataSource<SubItem>(element.subItems || []);
  }

  tab(element:any)
  {
    console.log(element)
  }
  td(sub:any){
    console.log("td ")
  }
}

