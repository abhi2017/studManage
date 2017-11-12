import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'; 


import { LoginRoutingModule } from './login-routing/login-routing.module';
import { LoginComponent } from './login.component';
import { AuthHttpService } from '../../services/auth-http.service';
import { StorageService } from '../../services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
  providers:[AuthHttpService, StorageService]
})
export class LoginModule { }
