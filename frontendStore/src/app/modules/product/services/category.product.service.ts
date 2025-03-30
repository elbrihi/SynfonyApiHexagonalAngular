import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestDataSource } from '../../../core/services/rest-data-source.service';
import { Product } from '../models/product.service';
import { Supplier } from '../../supplier/models/supplier';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService  extends RestDataSource{

  constructor(http:HttpClient) 
  {
    super(http)
  }

  ngOntInit(){}
  public getCategoryProducts()
  {
    const url = `${this.baseUrl}/get/catageries`;
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    })

    return this.http.get<Product[]>(url, {headers});
  }
  
  public getProductsByCategoryId(id: number)
  {

    const url = `${this.baseUrl}/categories/${id}/products/by/paginations`

   

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    })
        
    return this.http.get<Product[]>(url, {headers});
   
  }

  public suppliers(): any
  {
    const url = `${this.baseUrl}/get/suppliers`

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    })
        
    return this.http.get<Supplier[]>(url, {headers}).subscribe({
      next: (response: any) =>{
      },
      error: () =>{

      }
    })
  }

  public saveProducts(productsData: any)
  {
    const url = `${this.baseUrl}/create/multiple/new/products`; // Fixed extra slash
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      'Content-Type': 'application/ld+json', // Ensure the request body is JSON
    });

    return this.http.post<any>(url, productsData, { headers }).pipe(
      catchError((err) => {
        console.error('Error during product creation:', err);
        return throwError(() => new Error('Error during product creation.'));
      })
    );
  

  }


}
