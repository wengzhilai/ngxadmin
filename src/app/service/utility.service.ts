import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    public translate: TranslateService,
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
}
