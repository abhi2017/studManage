import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Request, 
  RequestOptionsArgs, 
  Response, 
  RequestOptions, 
  Headers, 
  Http
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TOKEN } from './login.service';
import { StorageService } from './storage.service';
import { AppSettings } from '../configuration/AppSettings';


@Injectable()
export class AuthHttpService {
  private monitoring = {
    pendingRequestsNumber: 0
  };
  constructor(
    private _http: Http,
    private _router: Router,
    private _storage: StorageService) {

  }
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    this.monitoring.pendingRequestsNumber++;
    return this.handleResponse(
      this._http.request(url, this.getRequestOptionArgs(options))).finally(() => {
            this.monitoring.pendingRequestsNumber--;
      });
  }
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.monitoring.pendingRequestsNumber++;
    var requestOption = this.getRequestOptionArgs(options);
    requestOption.body = '';
    return this.handleResponse(this._http.get(url)).finally(() => {
      this.monitoring.pendingRequestsNumber--;
    });
  }
  getWithoutHeaders(url: string) {
    this.monitoring.pendingRequestsNumber++;
    var requestOption = new RequestOptions();
    requestOption.body = '';
    return this.handleResponse(this._http.get(url, requestOption)).finally(() => {
      this.monitoring.pendingRequestsNumber--;
    });
  }
  post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
    this.monitoring.pendingRequestsNumber++;
    let body = JSON.stringify(data);
    return this.handleResponse(this._http.post(url, body, this.getRequestOptionArgs(options))).finally(() => {
      this.monitoring.pendingRequestsNumber--;
    });
  }
  form_post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
    this.monitoring.pendingRequestsNumber++;
    return this.handleResponse(this._http.post(url, data)).finally(() => {
      this.monitoring.pendingRequestsNumber--;
    });
  }
  form_data(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
    this.monitoring.pendingRequestsNumber++;
    var formData = new FormData();
    for (var k in data) {
      formData.append(k, data[k]);
    }
    return this.handleResponse(this._http.post(url, formData, this.getRequestOptionArgs(options, false))).finally(() => {
      this.monitoring.pendingRequestsNumber--;
    });
  }

  put(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
    this.monitoring.pendingRequestsNumber++;
    let body = JSON.stringify(data);
    return this.handleResponse(this._http.put(url, body, this.getRequestOptionArgs(options))).finally(() => {
      this.monitoring.pendingRequestsNumber--;
    });
  }
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.monitoring.pendingRequestsNumber++;
    return this.handleResponse(this._http.delete(url, options)).finally(() => {
      this.monitoring.pendingRequestsNumber--;
    });
  }
  getRequestOptionArgs(options?: RequestOptionsArgs, useContentType: Boolean = true): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    let token: TOKEN = this._storage.api.session.get(AppSettings.SESSION_KEY.TOKEN);
    if (token && token.access_token) {
      options.headers.append('Authorization', 'Bearer ' + token.access_token);
    }
    if (!options.headers.get('accept') && useContentType) {
      options.headers.append('accept', 'application/json');
    }
    if (!options.headers.get('content-type') && useContentType) {
      options.headers.append('content-type', 'application/json');
    }
    return options;
  }
  handleResponse(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status == 401 && !err.url.endsWith('api/account/login')) {
        this._storage.api.session.remove(AppSettings.SESSION_KEY.TOKEN);
        this._router.navigate(['/login']);
        return Observable.empty();
      }else {
        return Observable.throw(err);
      }
    }).finally(() => {
      if (this.monitoring.pendingRequestsNumber == 0) {
        //      this._spinnerService.done();
      }
    });
  }
  public extractData(res: Response) {
    let body = res.json();
    if (body.success) {
      return body.result || {};
    }
    return Observable.throw("There is some problem");
  }
  public handleError(error: any) {
    let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}