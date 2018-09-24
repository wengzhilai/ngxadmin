import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { UtilityService,UserService } from "../service";
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
  constructor(
    protected utilityService: UtilityService,
    protected userService: UserService,
    ) { 
   userService.getCurrentUser().subscribe(x=>{
     console.log(x);
     //如果没有获取用户的基本信息，则跳转到登录
     if(x==null){
      this.utilityService.router.navigateByUrl("/auth/login")
     }
   })

  }
  
}
