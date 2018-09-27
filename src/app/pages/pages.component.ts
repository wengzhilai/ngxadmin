import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { MENU_ITEMS } from './pages-menu';
import {UserService} from "../service/users.service"
import {ToPostService} from "../service/ToPost.Service"
import {UtilityService} from "../service/utility.service"
import {DefaultTreeviewI18n} from "../service/TreeviewI18n"
import { Config } from "../Classes";
@Component({
  selector: 'ngx-pages',
  styleUrls: ['./pages.component.scss'],
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
      else{
        let nowMenu = this.JsonToMenuItemJson(x.moduleList)
        nowMenu.unshift(  {
          title: '系统设置',
          group: true,
        })
        this.menu = nowMenu.concat(MENU_ITEMS)
      }
      console.log(this.menu);

    })
  }

  changeLang(lang) {
    console.log(lang);
    this.utilityService.translate.setDefaultLang(lang);
    this.utilityService.translate.use(lang).toPromise().then(() => {
      console.log(this.utilityService.translate);
    });
  }

  JsonToMenuItemJson(_inJson: any[]) {
    let inJson=JSON.parse(JSON.stringify(_inJson))
    console.log("开始 JSON 转 treeview的绑定对象")
    console.log(inJson)

    let reArr: NbMenuItem[] = []
    for (let index = inJson.length - 1; index >= 0; index--) {
      const element = inJson[index];
      if (element["PARENT_ID"] == null || element["PARENT_ID"] == "") {
        reArr.unshift({
          data: element["ID"],
          title: element["NAME"],
          icon: element["IMAGE_URL"],
        })
        inJson.splice(index, 1)
      }
    }
    //添加4级子菜单
    for (let index = 0; index < 4; index++) {
      for (let index = inJson.length - 1; index >= 0; index--) {
        const element = inJson[index];
        if (element["PARENT_ID"] != null && element["PARENT_ID"] != "") {
          reArr = this.JsonToTreeJsonAddChildren(reArr, element)
          inJson.splice(index, 1)
        }
      }
    }

    console.log("结束 JSON 转 treeview的绑定对象")
    console.log(reArr)
    return reArr;
  }
  JsonToTreeJsonAddChildren(inJson: Array<any>, addJson: any) {
    if (inJson == null) {
      inJson = []
    }
    if (addJson == null || addJson["NAME"] == null || addJson["NAME"] == "") {
      return inJson;
    }
    for (let index = 0; index < inJson.length; index++) {
      const element = inJson[index];
      if (element["data"] == addJson["PARENT_ID"]) {
        if (element["children"] == null) element["children"] = [];
        inJson[index]["children"].unshift({
          data: addJson["ID"],
          title: addJson["NAME"],
          icon: addJson["IMAGE_URL"],
          link: addJson["LOCATION"],
        })
      }
      else {
        if (element["children"] != null) {
          inJson[index]["children"] = this.JsonToTreeJsonAddChildren(element["children"], addJson)
        }
      }
    }
    return inJson;
  }
  
}
