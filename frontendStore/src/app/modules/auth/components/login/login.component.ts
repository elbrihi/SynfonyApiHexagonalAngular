import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Credentials } from '../../../../core/services/user/credentials.model';
import { Authservice } from '../../../../core/services/authservice/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrl: './login.component.css'
})
export class LoginComponent  {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
    
  });
  private formSubmitAttempt?: boolean;
      
  constructor(){
    

  }


  authService = inject(Authservice);

  ngOnInit() {
    console.log(this.form);
  }

  isFieldInvalid(field: string) {
   
  }

  onSubmit(avent: any) {

    console.log("hello----");
      if (this.form.valid) {
      const credentials: Credentials = this.form.value;

      this.authService.login(credentials);
    }
    this.formSubmitAttempt = true;
  }

}
