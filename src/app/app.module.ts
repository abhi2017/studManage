import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

import {MdProgressBarModule} from '@angular2-material/progress-bar';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';
import {Logger, Options} from "angular2-logger/core";



@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    MdProgressBarModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}, 
    AuthGuardService, 
    Logger,
    Options
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
