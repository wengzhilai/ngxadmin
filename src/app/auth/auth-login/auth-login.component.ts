import { Component, OnInit } from '@angular/core';
import { UtilityService } from "../../service";

@Component({
  selector: 'ngx-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  constructor(protected tilityService: UtilityService) { }

  ngOnInit() {
  }
  back() {
    this.tilityService.location.back();
    return false;
  }
}
