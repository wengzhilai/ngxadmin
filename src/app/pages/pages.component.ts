import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
  
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  //ngx-sample-layout
  //ngx-one-column-layout
  //ngx-three-columns-layout
  //ngx-two-columns-layout
  menu = MENU_ITEMS;
}
