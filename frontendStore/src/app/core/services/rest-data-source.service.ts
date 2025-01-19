import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestDataSource {
  protected readonly baseUrl = 'http://localhost:8181/api';
  protected readonly headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') || '',
    'Content-Type': 'application/ld+json', // Updated content-type
    'My-Custom-Header': 'foobar',
  });

  constructor(protected http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: localStorage.getItem('token') || '',
      'Content-Type': 'application/json', // Changed to application/json
      'My-Custom-Header': 'foobar',
    });
  }
  protected get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers: this.headers, params });
  }

  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, {
      headers: this.getHeaders(),
    });
  }
  protected put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, { headers: this.headers });
  }

  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { headers: this.headers });
  }
}
