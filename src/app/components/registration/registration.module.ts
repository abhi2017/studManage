import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'; 
import {UserService} from '../../services/userManagement.service';


import {RegisRoutingModule} from './regis-routing/regis-routing.module';
import { RegistrationComponent } from './registration.component';

@NgModule({
  imports: [
    CommonModule,
    RegisRoutingModule,
    FormsModule
  ],
  declarations: [RegistrationComponent],
  providers:[UserService]
})
export class RegistrationModule { }
