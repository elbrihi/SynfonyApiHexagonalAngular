import { Injectable } from '@angular/core';
import { RestDataSource } from '../../../core/services/rest-data-source.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataSourceService extends RestDataSource {

  constructor(http: HttpClient) 
  { 
      super(http)
  }

  getCategories()
  {
     let url = `${this.baseUrl}/get/catageries`;
      const headers = new HttpHeaders({
          
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      
      });
     
     
    return this.http.get<Category>(url, {headers});
  }

}
