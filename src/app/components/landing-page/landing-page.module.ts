import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MdProgressBarModule} from '@angular2-material/progress-bar';
import { LandingPageRoutingModule } from './landing-page-routing/landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    MdProgressBarModule,
    LandingPageRoutingModule,
    SharedModule
  ],
  declarations: [LandingPageComponent]
})
export class LandingPageModule { }
