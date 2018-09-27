import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryRoutingModule } from './query-routing.module';
import { QueryComponent } from './query.component';
import { QueryQueryComponent } from './query-query/query-query.component';
import { EasyUIModule } from 'ng-easyui/components/easyui/easyui.module';
@NgModule({
  imports: [
    CommonModule,
    QueryRoutingModule,
    EasyUIModule
  ],
  declarations: [QueryComponent, QueryQueryComponent]
})
export class QueryModule { }
