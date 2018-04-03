import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { EditForm } from '../../models/edit-form';
import { IsEmailExitsService } from '../services/is-email-exits.service';

declare var jQuery: any;

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  public email: string;
  public password;
  public id;
  public editFlag: boolean = false;
  public message;

  constructor(private router: Router, private http: HttpService, private isEmailExist: IsEmailExitsService) {

    if (localStorage.getItem("currentUser") == null) {
      this.router.navigate(['login']);
    }

    else if (localStorage.getItem("currentUser") != null) {

      var currentUserData = localStorage.getItem("currentUser");
      currentUserData = JSON.parse(currentUserData);
      this.email = currentUserData['email'];
      this.password = currentUserData['password'];
      this.id = currentUserData['id'];
    }
  }

  ngOnInit() { }

  edit() {
    this.editFlag = true;
  }

  update(editForm: any) {

    const updatedData = {
      email: editForm.value.email,
      password: editForm.value.password,
      id: this.id
    };
    console.log("UpdateData-->",updatedData);
    if (updatedData.password.length < 3) {
      this.message = "Password must be 3 digit Long";
      jQuery('#myModal').modal('show');
      return false
    }
    let isEmailExist;
    this.isEmailExist.isEmailExist(updatedData.email)
      .subscribe(response => {
        let currentUser = localStorage.getItem("currentUser");
        currentUser = JSON.parse(currentUser);

        if (currentUser['email'] == updatedData.email) {

          var myEmail = true;

          this.http.update(updatedData)
            .subscribe(response => {
              console.log("response After update-->", response);
              this.editFlag = false;
              console.log("can Edit");
              localStorage.setItem("currentUser", JSON.stringify(updatedData));
            });
        }

        if (response['data'].length == 0) {
          this.http.update(updatedData)
            .subscribe(response => {
              this.editFlag = false;
              localStorage.setItem("currentUser", JSON.stringify(updatedData));
            });
        }
        else if (myEmail != true) {
          this.message = "Email already Exist!";
          jQuery('#myModal').modal('show');
        }

      });
  }

  delete() {
    var confirmValue = confirm("are you want to delete your profile");
    if (confirmValue == true) {
      this.http.delete(this.id)
        .subscribe(response => {
          localStorage.removeItem('currentUser');
          this.router.navigate(['login']);
        });
    }
  };

  logOut() {
    localStorage.removeItem("currentUser");
    this.router.navigate(['login']);
  };
}