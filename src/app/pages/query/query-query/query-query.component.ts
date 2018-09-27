import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToPostService,UtilityService } from "../../../service";
@Component({
  selector: 'ngx-query-query',
  templateUrl: './query-query.component.html',
  styleUrls: ['./query-query.component.scss']
})
export class QueryQueryComponent implements OnInit {
  total: number = 100;
  pageNumber = 1;
  pageSize = 20;
  pagePosition: string = 'bottom';
  loading: boolean = false;
  data = [
  ];
  //代碼
  code
  constructor(
    private routerIonfo: ActivatedRoute,
    private toPostService: ToPostService,
    private commonService: UtilityService,
  ) { }

  ngOnInit() {
    this.LoadData()
  }
  LoadData() {

    this.code = this.routerIonfo.snapshot.params["code"];
    console.log(111)
    let postClass: any = {};
    postClass.Key = this.code;
    return this.toPostService.Post("query/single_code", postClass).then((data: any) => {
      if (data.IsSuccess) {
        this.data = data.Data
        // //隐藏，hide=true的字段
        // let t: any = {}
        // //设置列配置
        // eval("t=" + this.queryEnt.QUERY_CFG_JSON)
        // this.configJson = t
        // //设置表头按钮配置
        // eval("t=" + this.queryEnt.HEARD_BTN)
        // this.headBtnSet = t
        // //读取行按钮
        // try {
        //   eval("t=" + this.queryEnt.ROWS_BTN)
        //   this.rowBtnSet = t
        // } catch (error) {

        // }
        // if (this.rowBtnSet == null) this.rowBtnSet = []

        // let tempCol = ServerDataSource.ReMoveHideItem(this.configJson);
        // for (const item in tempCol) {
        //   if (tempCol[item]["renderComponent"] == "SmartTableFormatValuePage") {
        //     tempCol[item]["renderComponent"] = SmartTableFormatValuePage
        //   }
        // }
        // this.settings.columns = tempCol
        // this.LoadSetting = true
        // //配置是否有筛选框
        // if (this.queryEnt.SHOW_CHECKBOX != 1) {
        //   this.settings.selectMode = "single"
        // }

        // if (this.rowBtnSet.length > 1) {
        //   this.settings.actions.edit = true
        //   this.settings.edit.editButtonContent = '<i class="' + this.rowBtnSet[0].class + '"></i>'
        // }
        // if (this.rowBtnSet.length > 2) {
        //   this.settings.actions.edit = true
        //   this.settings.delete.deleteButtonContent = '<i class="' + this.rowBtnSet[1].class + '"></i>'
        // }
        // this.source = new ServerDataSource(this.toPostService, this.commonService, { endPoint: 'query/query' }, this.code);
      }
      else {
        this.commonService.hideLoading()
      }
    }, (x) => {
      console.log(x)
    })
  }


  ngAfterViewInit() {
    this.loadPage(this.pageNumber, this.pageSize);
  }

  onPageChange(event) {
    this.loadPage(event.pageNumber, event.pageSize);
  }

  loadPage(pageNumber: number, pageSize: number) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;

    }, 5000);

  }
}
