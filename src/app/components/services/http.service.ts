import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  result;
  constructor(private http: HttpClient) { }

  /**
   *  functionName : update
   *  functionlity : takes updated data of user and update the user's information
   *  
   *  data.params[]:
   *  [0]: email
   *  [1]: password
   *  [2]: id
   *
   * @param updatedData
   * @returns {Promise<response>}
   */
  update(updatedData) {
    return this.http.put('http://localhost:3000/update', updatedData).map(result => this.result = result);
  }

  /**
   *  functionName : delete
   *  functionlity : takes id data of user
   *  
   *  data.params[]:
   *  [0]: id
   *
   * @param id
   * @returns {Promise<response>}
   */
  delete(id) {
    return this.http.delete('http://localhost:3000/delete/' + id).map(result => this.result = result);
  }

}
