import { Component, OnInit } from '@angular/core';
import { ValidUserService } from '../services/valid-user.service';
import { Router } from '@angular/router';
import { LoginForm } from '../../models/login-form'
declare var jQuery: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private isUserValid: ValidUserService, private router: Router) {
    if (localStorage.getItem("currentUser") != null) {
      this.router.navigate(['welcome']);
    }
  }

  ngOnInit() { }

  login(loginForm: LoginForm) {
    const Userdata = {
      email: loginForm.email,
      password: loginForm.password
    };
     if (loginForm.password == null || loginForm.email == null ) {
       jQuery('#myModal').modal('show');
       return false;          
     }

    this.isUserValid.isValidUser(Userdata)
      .subscribe(response => {

        if (response["statusCode"] == 200) {

          if (response['data'].length > 0) {

            const userEmail: string = response["data"][0]["email"];
            const userPassword: string = Userdata.password;
            const userId: string = response["data"][0]["_id"];

            const currentUserData = {
              email: userEmail,
              password: userPassword,
              id: userId
            }
            localStorage.setItem("currentUser", JSON.stringify(currentUserData));
            this.router.navigate(['welcome']);
          }
          else {
            jQuery('#myModal').modal('show');
          }
        }
        else {
          jQuery('#myModal').modal('show');
        }
      });
  }

  backToLogin() {
    this.router.navigate(['login']);
  };
}
