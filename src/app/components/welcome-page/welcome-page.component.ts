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
  public name;
  public id;
  public editFlag: boolean = false;
  public message;
  public action: boolean = true;

  constructor(private router: Router, private http: HttpService, private isEmailExist: IsEmailExitsService) {

    if (localStorage.getItem("currentUser") == null) {
      this.router.navigate(['login']);
    }

    else if (localStorage.getItem("currentUser") != null) {

      var currentUserData = localStorage.getItem("currentUser");
      currentUserData = JSON.parse(currentUserData);
      this.email = currentUserData['email'];
      this.name = currentUserData['name'];
      this.password = currentUserData['password'];
      this.id = currentUserData['id'];
    }
  }

  ngOnInit() { }

  edit() {
    this.editFlag = true;
    this.action = false;
  }

  update(editForm: any) {


    const updatedData = {
      email: this.email,
      oldPassword: editForm.value.oldPassword,
      newPassword: editForm.value.newPassword,
      confirmPassword: editForm.value.confirmPassword,
      id: this.id

    };

    if (updatedData.oldPassword == this.password) {
      if (updatedData.newPassword == updatedData.confirmPassword) {
        if (updatedData.newPassword.length < 3) {
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
                  this.action = true;
                  this.message = "Password Successfully updated!";
                  jQuery('#myModal').modal('show');
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
      } else {
        this.message = "Password and confirm password does not match!";
        jQuery('#myModal').modal('show');
      }
    } else {
      this.message = "Worng old password!";
      jQuery('#myModal').modal('show');
    }
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
    jQuery('#logOutModal').modal('hide');
    localStorage.removeItem("currentUser");
    this.router.navigate(['login']);
  };

  back() {
    this.editFlag = false;
    this.action = true;
  }
}