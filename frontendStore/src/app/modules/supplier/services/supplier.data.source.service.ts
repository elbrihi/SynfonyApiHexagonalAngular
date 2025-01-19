import { Injectable } from '@angular/core';
import { RestDataSource } from '../../../core/services/rest-data-source.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Supplier } from '../models/supplier';

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
  addSupplier(supplier: any): Observable<any> {
    const url = `${this.baseUrl}/create/new/supplier`;

    // Set the correct headers to match the API expectations (application/ld+json)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      'Content-Type': 'application/ld+json', // Ensure this is set correctly
    });

    return this.http.post(url, supplier, { headers })
    .pipe(
      catchError(err => {
        console.error('Error during supplier creation:', err);
        return throwError(() => new Error('Error during supplier creation.'));
      })
    );;
  }
}
