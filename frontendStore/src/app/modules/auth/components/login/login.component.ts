import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../core/services/authservice/auth.service';
import { Credentials } from '../../../../core/services/user/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
    
  });
  private formSubmitAttempt?: boolean;

  constructor(
   // private fb: FormBuilder,
    private authService: AuthService

    
  ) {}

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
