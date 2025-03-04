import { inject, Injectable } from '@angular/core';
import { RestDataSource } from '../../../core/services/rest-data-source.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.model';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataSourceService extends RestDataSource {

  constructor(http: HttpClient) 
  { 
      super(http)
  }
  
  

  getCategoryById(id:any)
  {
        const url = `${this.baseUrl}/get/category/${id}`;
        const headers = new HttpHeaders({
          
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      
      });
        return this.http.get<Category>(url, {headers }).pipe(
          map((data: any) => {
            console.log("here", data)
            const category: Category = {
              id: data.id,
              categoryName: data.categoryName,
              categoryStatus: data.categoryStatus

            };
    
            // Optionally store the fetched supplier
            return category;
          }),
          catchError((error) => {
            console.error('Error fetching supplier data:', error);
            throw error;
          })
        );
  }
  getCategories()
  {
     let url = `${this.baseUrl}/get/catageries`;
      const headers = new HttpHeaders({
          
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      
      });
     
     
    return this.http.get<Category>(url, {headers});
  }

  postCategory(categories:any)
  {
      const url  = `${this.baseUrl}/create/multiple/new/categories`;

      const headers = new HttpHeaders({
          
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        'Content-Type': 'application/ld+json' 
    
      });

        return this.http.post(url, categories, { headers })
        .pipe(
              catchError(err => {
                console.error('Error during category creation:', err);
                return throwError(() => new Error('Error during category creation.'));
        })
      );
      
  }
  putCategpory(id:any,category:Category)
  {
      const url = `${this.baseUrl}/update/exsting/category/${id}`
          // Set the correct headers to match the API expectations (application/ld+json)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      'Content-Type': 'application/ld+json', // Ensure this is set correctly
    });

    return this.http.put(url,category, {headers}).pipe(
      catchError(err => {
        console.error('Error during supplier update:', err);
        return throwError(() => new Error('Failed to update supplier.'));
      })
    );
  }


}
