import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestDataSource } from '../../../core/services/rest-data-source.service';
import { Product } from '../models/product.service';

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
  

}
