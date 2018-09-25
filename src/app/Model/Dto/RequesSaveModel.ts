
import { KeyValuePair } from "./KeyValuePair";
import { PostBaseModel } from "./PostBaseModel";
/**
 * 请求数据包
 * 
 * @export
 * @class RequesPagesModel
 */
export class RequesSaveModel extends PostBaseModel  {
    constructor() {
        super();
        this.para=new Array<KeyValuePair>()
     }
     para:Array<KeyValuePair>;
     SaveKeys:string[];
     Data:any;
}