import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService {

  result;
  constructor(private http: HttpClient) { }

    /**
   *  functionName : register
   *  functionlity : takes data(email and password) of user and store in meanStack database  
   *  
   *  data.params[]:
   *  [0]: email
   *  [1]: password
   *
   * @param data
   * @returns {Promise<response>}
   */
  register(data) {
    return this.http.post('http://localhost:3000/register', data).map(result => this.result = result);
  };
}
