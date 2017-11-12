import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-nav-header-bar',
  templateUrl: './nav-header-bar.component.html',
  styleUrls: ['./nav-header-bar.component.css'],
  providers: [ StorageService ]
})
export class NavHeaderBarComponent implements OnInit {
  userName:String = "Admin";
  constructor(public router: Router, public _storage: StorageService) {

  }
  ngOnInit() {
    this.userName = this._storage.api.local.get("currentUser");
  }
  onLoggedout() {
    this._storage.api.local.clear();
    this._storage.api.session.clear()
    this.router.navigate(['login']);
  }
  
}
