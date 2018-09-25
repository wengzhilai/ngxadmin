
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cookies } from "../Classes";

let counter = 0;

@Injectable()
export class UserService {

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };

  private userArray: any[];

  constructor() {
    this.userArray = Object.values(this.users);
  }

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }
  /**
   * 获取当前用户
   */
  getCurrentUser(): Observable<any> {
    let str = Cookies.getCookie('user');
    if (str == null || str == '') {
      return observableOf(null)
    }
    let tmp = JSON.parse(str);
    if (tmp == null) {
      tmp = null;
    }
    return observableOf(tmp);
  }
  /**
   * 设置当前用户
   */
  setCurrentUser(user:any) {
    Cookies.setCookie("user",user)
    if (user == null) {
      return Cookies.setCookie('user', null)
    } else {
      console.log("保存用户：")
      console.log(user)
      return Cookies.setCookie('user', JSON.stringify(user));
    }
  }
}
