import { Injectable } from '@angular/core';
import { RestDataSource } from '../../../core/services/rest-data-source.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierDataSource extends RestDataSource {

  constructor(http: HttpClient) {
    super(http);
  }

 

  getSuppliersByPagination(itemsPerPage: number, page: number): Observable<any> {
 
    const url = `${this.baseUrl}/get/suppliers/by/paginations`;
    
    const params = new HttpParams()
      .set('itemsPerPage', itemsPerPage.toString())
      .set('page', page.toString());
 
   
    return this.http.get(url, { params });
  }
}
