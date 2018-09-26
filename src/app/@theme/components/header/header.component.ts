import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import {UserService} from "../../../service/users.service"
import {ToPostService} from "../../../service/ToPost.Service"
import {UtilityService} from "../../../service/utility.service"
import {DefaultTreeviewI18n} from "../../../service/TreeviewI18n"
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: this.utilityService.LanguageStr('home.userMenu_Profile') }, { title: this.utilityService.LanguageStr('home.userMenu_LogOut')}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private utilityService:UtilityService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe((users: any) => this.user = users);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
