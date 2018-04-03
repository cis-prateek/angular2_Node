import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ValidUserService {

  constructor(private http: HttpClient) { }
  result
  /**
  *  functionName : isValidUser
  *  functionlity : takes email and password and checks for valid user
  *  
  *  data.params[]:
  *  [0]: email
  *  [1]: password
  *
  * @param data
  * @returns {Promise<response>}
  */
  isValidUser(data) {
    return this.http.post('http://localhost:3000/login', data).map(result => this.result = result);
  }
}
