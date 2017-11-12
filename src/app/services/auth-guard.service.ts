import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(private router: Router, private _login: LoginService) { }
  canActivate() {
    if (this._login.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
