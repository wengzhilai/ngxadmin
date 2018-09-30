import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { QueryRoutingModule, routedComponents } from './query-routing.module';

import { AppTranslationModule } from '../../app.translation.module';


@NgModule({
  imports: [
    QueryRoutingModule,
    AppTranslationModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents
  ]
})
export class QueryModule { }
