/**
 * Created by wengzhilai on 2017/1/12.
 */
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Config } from "../Classes";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AppReturnDTO } from "../Model/Dto/AppReturnDTO"

@Injectable()
export class ToPostService {
  constructor(
    private http: Http,
  ) {
  }



  Post(apiName, postBean: any, callback = null) {
    console.group("开始请求[" + apiName + "]参数：");
    console.time("Post时间");

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // console.log(headers)
    console.log(postBean)
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(Config.api + apiName, postBean, options)
      .toPromise()
      .then((res: any) => {
        console.log("返回结果：");
        let response: any = res.json();
        console.log(response)
        if (response.IsSuccess) {
          if (callback) {
            callback(response);
          }
        }
        else {
          console.warn(response.Msg)
        }
        console.timeEnd("Post时间");
        console.groupEnd();
        return response;
      }, (error) => {
        console.error('请求失败:');
        console.error(error)
        console.timeEnd("Post时间");
        console.groupEnd();

        let errorMsg: AppReturnDTO = new AppReturnDTO();
        errorMsg.IsSuccess = false;
        errorMsg.Msg = "连接网络失败";
        return errorMsg
      })
      .catch();
  }


  PostContentType(apiName, postStr: string, contentType: string) {
    console.group("请求[" + apiName + "]参数：");
    console.time("Post时间");
    console.log(postStr);

    var headers = new Headers();
    headers.append('Content-Type', contentType);
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(Config.api + apiName, postStr, options)
      .toPromise()
      .then((res: Response) => {
        console.log("返回结果：");
        console.log(res)
        console.timeEnd("Post时间");
        console.groupEnd();
        let response: any = res.json();
        return response;
      }, (error) => {
        console.log('请求失败'); // for demo purposes only
        console.log(error) 
        console.timeEnd("Post时间");
        console.groupEnd();
      })
      .catch();
  }



  PostToObservable(apiName, postBean: any, callback = null) {
    console.group("开始请求[" + apiName + "]参数：");
    console.time("Post时间");

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // if (AppGlobal.GetToken() != null) {
    //   headers.append('Authorization', 'Bearer ' + AppGlobal.GetToken());
    // }
    // console.log(headers)
    console.log(postBean)
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Config.api + apiName, postBean, options).map((res) => {
      console.log("返回结果：");
      let response: any = res.json();
      console.log(response)
      if (response.IsSuccess) {
        if (callback) {
          callback(response);
        }
      }
      else {
        console.warn(response.Msg) 
      }
      console.timeEnd("Post时间");
      console.groupEnd();
      return response;
    })
  }
}
