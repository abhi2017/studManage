import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';   
import {Observable} from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserService {
    headers: Headers;
    options: RequestOptions;

    constructor(public _http: Http) {
    this.headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                                        'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
    }
    

    getUserList() {
            return this._http.get('http://localhost:8181/userList')
            .map((response => response.json()))
        }

    getRolesList() {
          return this._http.get('http://localhost:8181/roles')
          .map((response => response.json()))
    }


     addUser(userDetail): Observable<any> {
        console.log("addd");
        return this._http
        .post('http://localhost:8181/addUser', userDetail, this.options)
        .map(this.extractData)
        .catch(this.handleErrorObservable);
    }

    updateUser(userDetail): Observable<any> {
         return this._http.post('http://localhost:8181/updateUser', userDetail, this.options)
        .map(this.extractData)
        .catch(this.handleErrorObservable);
    }

    getPhaseList() {
        return this._http.get('http://localhost:8181/phases')
        .map((response => response.json()))
    }

    deleteServiceWithId(user): Observable<any> {
    return this._http
        .post('http://localhost:8181/deleteUser', user, this.options)
        .map(this.extractData)
        .catch(this.handleError);
    }


    private extractData(res: Response) {
const body = res.json();
        return body.data || {};
    }
    private handleErrorObservable (error: Response | any) {
	  //                                      console.error(error.message || error);
return Observable.throw(error.message || error);
    }

     private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
