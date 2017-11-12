import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHeaderBarComponent } from './nav-header-bar/nav-header-bar.component';
// import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';
import { DataTablesModule } from 'angular-datatables';
import { MdCheckboxModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdDatepickerModule } from '@angular/material';
import { MdNativeDateModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
// import { LeadHeadFuncInfoComponent } from './lead-head-func-info/lead-head-func-info.component';
// import { TableCustomColumnChildRowComponent } from './table-custom-column-child-row/table-custom-column-child-row.component';
import {MdTooltipModule} from '@angular/material'; 

@NgModule({
  imports: [
    CommonModule,
    MdCheckboxModule,
    MdTabsModule,
    MdDatepickerModule, 
    MdNativeDateModule,
    MdInputModule,
    MdSelectModule,
    MdButtonModule,
    DataTablesModule,
    MdTooltipModule,
 
  ],
  declarations: [
    NavHeaderBarComponent, 
 ],
  exports: [
    NavHeaderBarComponent, 
  ]
})
export class SharedModule { }
// platformBrowserDynamic().bootstrapModule(SharedModule);