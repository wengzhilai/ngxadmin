import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryComponent } from './query.component';
import { QueryQueryComponent } from './query-query/query-query.component';


export const routes: Routes = [
  {
    path: '',
    component: QueryComponent,
    children: [
      {
        path: 'query/:code',
        component: QueryQueryComponent,
      }
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryRoutingModule { }
