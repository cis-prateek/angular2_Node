import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { RegistrationComponent } from './components/registration/registration.component';

import { ValidUserService } from './components/services/valid-user.service';
import { HttpService } from './components/services/http.service';
import { RegistrationService } from './components/services/registration.service';
import { IsEmailExitsService } from './components/services/is-email-exits.service'

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AppRoutingModule } from './/app-routing.module';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginPageComponent,
    WelcomePageComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ValidUserService, HttpService, RegistrationService, IsEmailExitsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
