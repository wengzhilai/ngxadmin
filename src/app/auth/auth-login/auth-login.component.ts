import { Component, OnInit } from '@angular/core';
import { UtilityService,ToPostService,UserService } from "../../service";
import { Config } from "../../Classes";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
    /** 多语言 */
    public i18n = "auth-login";
  formGroup: FormGroup;

  user: any = {};

  constructor(
    protected utilityService: UtilityService,
    protected toPostService: ToPostService,
    protected userService: UserService,
    
    private formBuilder: FormBuilder,
    ) { 
      //配置输入验证
      this.formGroup = this.formBuilder.group({
        loginName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        passWord: ['', [Validators.required]]
      });

  }

  SetForm(inEnt) {
    this.formGroup.get('loginName').setValue(inEnt.loginName)
    this.formGroup.get('passWord').setValue(inEnt.passWord)
  }
  ngOnInit() {
  }
  back() {
    this.utilityService.location.back();
    return false;
  }

  login() {
    if (this.formGroup.invalid) {
        let formErrors = this.utilityService.FormValidMsg(this.formGroup, this.i18n);
        console.log(formErrors);
        this.utilityService.hint(formErrors.ErrorMessage, this.utilityService.LanguageStr("public.Invalid_input"))
        return;
    }
    this.user = this.formGroup.value;

    this.utilityService.showLoading()
    this.toPostService.Post("auth/UserLogin", this.user).then((res: any) => {
        this.utilityService.hideLoading()
        if (res == null) {
            this.utilityService.hint(this.utilityService.LanguageStr("public.LoginError"))
            return false;
        }
        if (res.IsSuccess) {
            this.utilityService.CooksSet("loginName", this.formGroup.value.loginName)
            this.utilityService.SetToken(res.Code)
            this.userService.setCurrentUser(res.Data)
            this.utilityService.location.back();
            return true
        }
        else {
            this.utilityService.hint(res.Msg);
            return false
        };
    }, (err) => {
        this.utilityService.hint(err, this.utilityService.LanguageStr("public.Error"));
        return false
    })

}
}
