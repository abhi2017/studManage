import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { StorageService } from './storage.service';
import { AppSettings } from '../configuration/AppSettings';
import { AuthHttpService } from './auth-http.service';

export class loginModel{ 
  public userName :string;
  public password:string;
  constructor( userName :string, password:string){
    this.userName = userName;
    this.password = password; 
  }   
}
export interface TOKEN {
  access_token:string;
  token_type:string;
  expires_in:string;
  userName:string;
  roles:string;
  '.issued':string;
  '.expires':string;
}
@Injectable()
export class LoginService {
  constructor(
    public _http: AuthHttpService,
    public http:Http,
    private _storage:StorageService) { 

  }
  public login(model:loginModel){
    // return this._http.get(AppSettings.URL.LOGIN_SERVICE)
    // .map((response=> response.json()))
    // .catch(this.handleError);
    let headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');

    /*return this._http.form_post("assets/jsons/login.json",
    'grant_type=password&userName=' + encodeURIComponent(model.userName) + '&password=' + encodeURIComponent(model.password))
    .map((response)=>response.json())
    .catch(this._http.handleError);*/

    return this.http.get('assets/jsons/login.json')
    .map((response)=>response.json())
    .catch(this._http.handleError);

  }
  public isAuthenticated():boolean {
    let token:TOKEN = this._storage.api.local.get(AppSettings.SESSION_KEY.TOKEN);
    return token != null && !!token.access_token; //TODO check empty token
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }      
}
