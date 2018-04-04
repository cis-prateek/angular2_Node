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
  public message: string;
  constructor(private isUserValid: ValidUserService, private router: Router) {
    if (localStorage.getItem("currentUser") != null) {
      this.router.navigate(['welcome']);
    }
  }

  ngOnInit() { }

  login(loginForm) {


    const Userdata = {
      email: loginForm.email,
      password: loginForm.password
    };

    if (loginForm.password == null || loginForm.email == null) {
      this.message = "Email and Password cant be null";
      jQuery('#myModal').modal('show');
      return false;
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Userdata.email)) {

      if (Userdata.password.length >= 3) {

        this.isUserValid.isValidUser(Userdata)
          .subscribe(response => {

            if (response["statusCode"] == 200) {

              if (response['data'].length > 0) {

                const userEmail: string = response["data"][0]["email"];
                const name:string = response["data"][0]["name"];
                const userPassword: string = Userdata.password;
                const userId: string = response["data"][0]["_id"];

                const currentUserData = {
                  email: userEmail,
                  name: name,
                  password: userPassword,
                  id: userId
                }
                localStorage.setItem("currentUser", JSON.stringify(currentUserData));
                this.router.navigate(['welcome']);
              }
              else {
                this.message = "Incorrect Credentials";
                jQuery('#myModal').modal('show');
              }
            }
            else {
              this.message = "Incorrect Email and Password";
              jQuery('#myModal').modal('show');
            }
          });
      }
      else {
        this.message = "Incorrect Password";
        jQuery('#myModal').modal('show');
      }
    }
    else {
      this.message = "Fill correct Email and Password";
      jQuery('#myModal').modal('show');
      return false;
    }

  }

  backToLogin() {
    this.router.navigate(['login']);
  };
}
