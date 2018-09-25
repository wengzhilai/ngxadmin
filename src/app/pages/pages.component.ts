import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { UtilityService, UserService } from "../service";
import { Config } from "../Classes";
@Component({
  selector: 'ngx-pages',
  template: `
  
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
/** 可选样式
  ngx-sample-layout
  ngx-one-column-layout
  ngx-three-columns-layout
  ngx-two-columns-layout
 */

export class PagesComponent {

  //加载菜单
  menu = MENU_ITEMS;
  constructor(
    protected utilityService: UtilityService,
    protected userService: UserService,
  ) {

    userService.getCurrentUser().subscribe(x => {
      console.log(x);
      //如果没有获取用户的基本信息，则跳转到登录
      if (x == null) {
        this.utilityService.router.navigateByUrl("/auth/login")
      }
    })
  }

  changeLang(lang) {
    console.log(lang);
    this.utilityService.translate.setDefaultLang(lang);
    this.utilityService.translate.use(lang).toPromise().then(() => {
      console.log(this.utilityService.translate);
    });
  }

  isOpen = false
  CheckAppUrl() {
    setTimeout(() => {
      this.isOpen = false
    }, 200);
    if (!this.isOpen) {
      this.isOpen = true;
      return;
    }
    let buttons = [
      {
        name: "初始值",
        click: (data): Promise<any> => {
          return new Promise((resolver, reject) => {
            Config.api = Config._api
            Config.imgUrl = Config.api.toLowerCase().replace("/api", "")
            console.log("imgUrl:" + Config.imgUrl);
            console.log("api:" + Config.api);
            resolver("初始值")
          })
        }
      },
      {
        name: "确认",
        click: (data): Promise<any> => {
          return new Promise((resolver, reject) => {
            this.utilityService.CooksSet('apiUrl', data.apiUrl);
            Config.api = data.apiUrl
            Config.imgUrl = Config.api.toLowerCase().replace("/api", "")
            console.log("imgUrl:" + Config.imgUrl);
            console.log("api:" + Config.api);
            resolver("确认")
          })
        }
      }
    ]
    let inputs = [
      {
        name: 'apiUrl',
        value: Config.api,
        placeholder: 'API连接地址'
      }
    ]


    this.utilityService.Confirm("配置接口", [], buttons, inputs)
  }
  
}
