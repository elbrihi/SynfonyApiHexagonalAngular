import { Injectable } from '@angular/core';
import { RestDataSource } from '../../../core/services/rest-data-source.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierDataSource extends RestDataSource {

  public supplier?: Supplier;
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
  getSupplierById(id: any)
  {
    const url = `${this.baseUrl}/get/supplier/${id}`;
    return this.http.get<Supplier>(url).pipe(
      map((data: any) => {
        console.log("here", data)
        const supplier: Supplier = {
          id: data.id,
          supplierName: data.supplierName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          adress: data.adress,
          supplierType: data.supplierType,
          paymentTerms: data.paymentTerms,
          mainContact: data.mainContact,
          paymentMethods: data.paymentMethods,
          uniqueIdentifer: data.uniqueIdentifer
        };

        // Optionally store the fetched supplier
        this.supplier = supplier;
        return supplier;
      }),
      catchError((error) => {
        console.error('Error fetching supplier data:', error);
        throw error;
      })
    );
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

  updateSupplier(id:any,supplier: any)
  {
 
    
    const url = `${this.baseUrl}/create/update/supplier/${id}`;

    console.log(url)
    // Set the correct headers to match the API expectations (application/ld+json)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      'Content-Type': 'application/ld+json', // Ensure this is set correctly
    });

    return this.http.put(url, supplier, { headers }).pipe(
      catchError(err => {
        console.error('Error during supplier update:', err);
        return throwError(() => new Error('Failed to update supplier.'));
      })
    );
    
  }
}
