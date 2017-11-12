import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logger }  from 'angular2-logger/core';

import {
  loginModel,
  LoginService,
  TOKEN
} from '../../services/login.service';
import { StorageService } from '../../services/storage.service';
import { AppSettings } from '../../configuration/AppSettings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, StorageService, Logger]
})
export class LoginComponent implements OnInit {
  public loggedIn:TOKEN;
  public errorMsg:string =null;
  public model = new loginModel('','');
  constructor(
    private _router: Router,
    private _service: LoginService,
    private _storage: StorageService,
    private _logger: Logger
  ){

  }
  ngOnInit() {
    this.model.userName = '';
    this.model.password = '';
    console.log(this.loggedIn);
  }
  onLoggedin() {
    this._logger.info("starting logging in");
        this._service.login(this.model)
          .subscribe(
              data => {
                  this.loggedIn = data.token;
                  this._storage.api.local.save(AppSettings.SESSION_KEY.TOKEN, this.loggedIn);
                  this._storage.api.local.save('currentUser', this.loggedIn.userName);         
                  this._router.navigate(['/landing']);
              },
              message => {
                this._logger.error(message);
                this.errorMsg = message;
              }
          );
  }
  onRegister(){
    this._router.navigate(['/registration']);
  }
}
