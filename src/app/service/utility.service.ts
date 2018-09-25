import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { Location } from '@angular/common';
import { Router} from '@angular/router'; //导入router服务
import { ModalConfirmPage,ModalLoadingPage } from "../components/modals";

import { BsModalService } from 'ngx-bootstrap/modal';
import { Cookies } from "../Classes";
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {


  constructor(
    public translate: TranslateService,
    public location: Location,
    public router: Router,    
    private modalService: BsModalService,
  ) { }
  /**
   * 获取翻译值
   * @param key 
   */
  LanguageStr(key: string | Array<string>) {
    if (typeof key == 'string') {
      return this.translate.instant(key);
    }
    else if (typeof key == 'object') {
      let tmpResArr = this.translate.instant(key);
      let reArr = [];
      key.forEach(element => {
        reArr.push(tmpResArr[element])
      });
      return reArr.join(" ");
    }
  }

  Confirm(title, messageList: Array<any>, buttons = null, inputs = []) {
    if (buttons == null) {
      buttons = [
        {
          name: "确定",
          click: (e): Promise<any> => {
            return new Promise((resolver, reject) => {
              resolver("OkText")
            })
          }
        },
        {
          name: "取消",
          click: (e): Promise<any> => {
            return new Promise((resolver, reject) => {
              resolver("ChancelText")
            })
          }
        }
      ]
    }

    const initialState = {
      "title": title,
      "messageList": messageList,
      "inputs": inputs,
      "buttons": buttons
    };

    console.log(initialState)
    let modalRef = this.modalService.show(ModalConfirmPage, { initialState, "class": 'modal-sm', });
  }

   CooksSet(_k: string, _v: string, validity?: number, validityType?: string) {
    console.log("设置cookie:" + _k + "=》" + _v)
    return Cookies.setCookie(_k, _v, 60 * 24 * 365 * 10);
  }
  CooksGet(_k: string): string {
    var tmpStr = Cookies.getCookie(_k);
    console.log("读取cookies:" + _k + "=>" + tmpStr)
    return tmpStr
  }
  CooksRemove(_k: string) {
    Cookies.deleteCookie(_k)
  }

  GetToken(){
    return this.CooksGet("Token");
  }
  SetToken(token:string){
    return this.CooksSet("Token",token);
  }

  FormValidMsg(userForm: FormGroup, validationMessages) {
    if (validationMessages == null) validationMessages = {};
    var formErrors: any = {};
    if (!userForm) {
      return;
    }
    let defautMsg = {
      'required': () => {
        return this.translate.instant("public.Not_null");
      },
      'minlength': (ent: any) => {
        return this.translate.instant("public.mini_string", { minNum: ent.requiredLength, currNum: ent.actualLength });
      },
      'maxlength': (ent: any) => {
        return this.translate.instant("public.max_string", { minNum: ent.requiredLength, currNum: ent.actualLength });
      },
      "pattern": (ent: any) => {
        return this.translate.instant("public.pattern", { minNum: ent.requiredLength, currNum: ent.actualLength });
      }
    };
    for (const field in userForm.value) {
      const control = userForm.get(field);
      if (!control.valid) {
        // 默认名称为字段
        let keyName = field;
        // 错误的信息
        let keyMesg = "";

        if (typeof (validationMessages) == "object") {
          //是否配置了中文名称
          if (validationMessages[field]['aliasName'] != null) {
            keyName = validationMessages[field]['aliasName'];
          }
        }
        else if (typeof (validationMessages) == "string") {
          keyName = this.LanguageStr(validationMessages + "." + field)
        }

        //所有错误
        for (const key in control.errors) {
          //判断是否有配置
          if (typeof (validationMessages) == "object") {
            const messages = validationMessages[field];
            //是否配置了错误信息
            if (messages[key] != null) {
              keyMesg += messages[key];
            }
            else {
              if (defautMsg[key] != null) {
                keyMesg += defautMsg[key](control.errors[key]);
              }
              else {
                keyMesg += key;
              }
            }
          }
          else {
            if (defautMsg[key] != null) {
              keyMesg += defautMsg[key](control.errors[key]);
            }
            else {
              keyMesg += key;
            }
          }


        }
        formErrors[keyName] = keyMesg;
      }
    }

    let errMsg = "";
    for (const field in formErrors) {
      errMsg += "<p>" + this.translate.instant(field) + "：" + formErrors[field] + "</p>"
    }
    return { "ErrorItemArr": formErrors, "ErrorMessage": errMsg };
  }

  hint(msg: string, title: string = null) {
    if (msg == null || msg == '') {
      return;
    }
    if (title == null || title == '') {
      title = this.translate.instant("public.title");
    }

    let buttons = [
      {
        name: "确定",
        click: (e): Promise<any> => {
          return new Promise((resolver, reject) => {
            resolver("OkText")
          })
        }
      }
    ]

    const initialState = {
      "title": title.replace(/\r/g, "<br />"),
      "messageList": [msg.replace(/\\r\\n/g, "<br />")],
      "buttons": buttons
    };

    this.modalService.config.ignoreBackdropClick = true;
    console.log(initialState)

    let modalRef = this.modalService.show(ModalConfirmPage, { initialState, "class": 'modal-sm', });

  }

  // 用于保存弹出框
  public loader;

  /**
   * 显示加载
   * 
   * @param {string} [msg='{{"public.refreshingText"|translate}}'] 
   * @memberof CommonService
   */
  showLoading(msg = this.translate.instant("public.Loading")) {


    const initialState = {
      msg: msg.replace(/\\r\\n/g, "<br />"),
    };

    this.modalService.config.ignoreBackdropClick = true;

    this.loader = this.modalService.show(ModalLoadingPage, { initialState });

  };
  /**
   * 隐藏加载
   * 
   * @memberof CommonService
   */
  hideLoading() {
    try {
      if (this.loader != null) {
        this.loader.hide();
      }
    } catch (e) { }
  }


  /**
   * JSON 转 treeview的绑定对象
   * @param inJson J
   * @param valueField 
   * @param textField 
   * @param childrenField 
   * @param checkValueArr 
   */
  JsonToTreeJson(_inJson: Array<any>, valueField, textField, childrenField, checkValueArr: Array<any>) {
    if (checkValueArr == null) checkValueArr = []
    let inJson = JSON.parse(JSON.stringify(_inJson))
    console.log("开始 JSON 转 treeview的绑定对象")
    console.log(_inJson)
    console.log(valueField)
    console.log(textField)
    console.log(childrenField)
    console.log(checkValueArr)

    let reArr: Array<any> = []
    for (let index = inJson.length - 1; index >= 0; index--) {
      const element = inJson[index];
      if (element[childrenField] == null || element[childrenField] == "") {
        reArr.unshift({ text: element[textField], value: element[valueField], checked: checkValueArr.indexOf(element[valueField]) > -1 })
        inJson.splice(index, 1)
      }
    }
    //添加4级子菜单
    for (let a = 0; a < 8; a++) {
      let maxLeng = inJson.length
      for (let index = 0; index < maxLeng; index++) {
        const element = inJson[index];
        if (element[childrenField] != null && element[childrenField] != "") {
          let issuse = this.JsonToTreeJsonAddChildren(reArr, element, textField, valueField, childrenField, checkValueArr)
          if (issuse) {
            inJson.splice(index, 1)
            maxLeng--
            index--
          }
        }
      }
    }

    console.log("结束 JSON 转 treeview的绑定对象")
    console.log(reArr)
    return reArr;
  }
  /**
   * 
   * @param inJson 待完成的项
   * @param addJson 需要添加的项
   * @param textField 
   * @param valueField 
   * @param childrenField 
   * @param checkValueArr 
   */
  JsonToTreeJsonAddChildren(inJson: Array<any>, addJson: any, textField: string, valueField: string, childrenField: string, checkValueArr: Array<any>) {

    if (inJson == null) {
      inJson = []
    }
    if (addJson == null || addJson[valueField] == null || addJson[valueField] == "") {
      return false;
    }
    //循环现在的项
    for (let index = 0; index < inJson.length; index++) {
      const element = inJson[index];
      if (element["value"] == addJson[childrenField]) {
        if (element["children"] == null) element["children"] = [];
        inJson[index]["children"].unshift({ text: addJson[textField], value: addJson[valueField], checked: checkValueArr.indexOf(addJson[valueField]) > -1 })
        return true
      }
      else if (element["children"] != null) {
        //只要添加成功就退出，否则就继续查找
        if(this.JsonToTreeJsonAddChildren(element["children"], addJson, textField, valueField, childrenField, checkValueArr)){ 
          return true
        }
      }
    }
    return false;
  }

  TreeJsonToArrJson(_inJson: Array<any>, valueField, textField, childrenField, checkValueArr: Array<any>, level: number = 0) {
    let reList = []
    let fiex = ""
    for (let index = 0; index < level; index++) {
      fiex = fiex + "　"
    }
    for (let index = 0; index < _inJson.length; index++) {
      const element = _inJson[index];
      reList.push({ "text": fiex + element[textField], "value": element[valueField] })
      if (element[childrenField] != null && element[childrenField].length != 0) {
        let child = this.TreeJsonToArrJson(element[childrenField], valueField, textField, childrenField, checkValueArr, level + 1)
        child.forEach(element => {
          reList.push(element)
        });
      }
    }
    return reList
  }
}
