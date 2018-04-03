import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IsEmailExitsService {
  result; 
  constructor(private http: HttpClient) { }
    /**
   *  functionName : isEmailExist
   *  functionlity : takes updated data of user and update the user's information
   *  
   *  data.params[]:
   *  [0]: email
   *
   * @param email
   * @returns {Promise<response>}
   */
  isEmailExist(email) { 
    return this.http.get('http://localhost:3000/isEmailExist/'+ email).map(result => this.result = result);
  }
}
