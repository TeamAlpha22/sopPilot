import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:any = FormGroup;
  formSubmitAttempt:boolean = false;
  invalidLogin: boolean = false;
  loader:boolean = false;
  constructor( private fb: FormBuilder, private router: Router) { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [ '', Validators.compose([Validators.required,])],
      password: ['', [Validators.required, ]]
     //  username: [ '', [Validators.required]],
     //  password: ['', [Validators.required]]
    });
  }

  // Click submit button on login page
  onSubmit(): void {
    console.log(this.loginForm.value,"this.loginForm")
   if(this.loginForm.value.username !='exlhealth@exlservice.com' && this.loginForm.value.password !='12345'){
     this.invalidLogin = false;
     this.router.navigate(["home"]);
   }else{
     this.router.navigate(["login"]);
   }

  }

}
