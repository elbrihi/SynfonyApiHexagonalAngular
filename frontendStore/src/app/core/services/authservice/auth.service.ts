import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const PROTOCOL = 'http://localhost:8181/api/';
const headers = { 'Authorization': localStorage.getItem('token'), 'My-Custom-Header': 'foobar' };
const body = { title: 'Angular POST Request Example' };
const PORT = 8181;

@Injectable({
  providedIn: 'root'
})
export class Authservice{

  private baseUrl: string
 public loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  constructor() 
  {
    this.baseUrl = `${PROTOCOL}`;
    
  }



  http = inject(HttpClient);
  router = inject(Router);

  login(credentials: any) {
    
    console.log("dwdwdwd")
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json'
    });
    this.http.post<any>(this.baseUrl+"user/auth-token ", credentials, { headers}).subscribe(response =>{
      //console.log(response.token);
      //console.log(response.apiToken);
      localStorage.setItem('token', response.apiToken);
      this.loggedIn.next(true);
      this.router.navigate(['']);
    });

}

  logout() {
    // If your backend requires a logout endpoint, uncomment the following lines and adjust the URL:
    // const url = this.baseUrl + 'logout';
    // this.http.post(url, {}).subscribe(() => {
    //   this.clearSession();
    // });

    this.clearSession();
  }
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  private clearSession() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  public hasToken(): boolean {
    return !!localStorage.getItem('token');
}


}
