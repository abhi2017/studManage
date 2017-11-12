import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginService } from '../services/login.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthHttpService } from '../services/auth-http.service';
import { StorageService  } from '../services/storage.service';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full'},
  { path: 'login', loadChildren: '../components/login/login.module#LoginModule' },
  { path: 'registration', loadChildren: '../components/registration/registration.module#RegistrationModule' },
  { path: 'landing', loadChildren: '../components/landing-page/landing-page.module#LandingPageModule',canActivate : [ AuthGuardService ] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [LoginService, AuthHttpService, StorageService]
})
export class AppRoutingModule { }
