import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../../services/userManagement.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {
  model :any ={};
  constructor(private _router: Router, private service: UserService) { }
  getData:any= {};

  ngOnInit() {
    this.model.studName='';
    this.model.studEmail = '';
    this.model.studSection = '';
    this.model.studMobile = '';
  }
  register(){
    let stud_name = $('#stud_name').val();
    console.log("Name:" , stud_name);
    let stud_email = $('#stud_email').val();
    console.log("Email:" , stud_email);
    //alert("register successfully");
  }
  onLogin(){
    this._router.navigate(['/login']);
  }
  addUser_details(){
    this.service.addUser(this.getData).subscribe(data =>{
      console.log("adddd", this.getData);
    })
  }


}
