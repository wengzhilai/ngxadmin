import { KeyValuePair } from "../Model/Dto";

export class Config {
  static debug:boolean = false;
  static pageSize:number = 10;
  static api:string = 'http://www.wjbjp.cn/';
  static imgUrl:string = 'http://www.wjbjp.cn/Api/';

  static _api:string = Config.api;
  static _imgUrl:string = Config.imgUrl;

  static Language:string = 'zh' //设置语言
  static LanguageArray:Array<KeyValuePair> = [
    <KeyValuePair>{Key:"zh",Value:"简体中文"},
    <KeyValuePair>{Key:"en",Value:"English"}
  ] //设置语言
  static LanguageIsCH:boolean = Config.Language=='zh' //是否是中文
  constructor() { }
}
