import {Component, Input} from '@angular/core';
import { NbThemeService, NbPopoverDirective } from '@nebular/theme';
import { AnalyticsService } from '../../../../@core/utils/analytics.service';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import { UtilityService } from "../../../../service/utility.service";
@Component({
  selector: 'ngx-theme-switcher-list',
  template: `
    <ul class="themes-switcher-list">
      <li class="themes-switcher-item"
          *ngFor="let theme of themes"
          (click)="onToggleTheme(theme.key)">
        <i class="nb-drop" [ngClass]="'drop-icon-' + theme.key"></i>
        <span>{{ theme.title }}</span>
      </li>
    </ul>
  `,
  styleUrls: ['./theme-switcher-list.component.scss'],
})
export class ThemeSwitcherListComponent {

  @Input() popover: NbPopoverDirective;

  theme: NbJSThemeOptions;

  themes = [
    {
      title: this.utilityService.LanguageStr("home.themes_Light"),
      key: 'default',
    },
    {
      title: this.utilityService.LanguageStr("home.themes_Cosmic"),
      key: 'cosmic',
    },
    {
      title: this.utilityService.LanguageStr("home.themes_Corporate"),
      key: 'corporate',
    },
  ];

  constructor(
    private utilityService: UtilityService,
    private themeService: NbThemeService,
    private analyticsService: AnalyticsService,
    
  ) {}

  onToggleTheme(themeKey: string) {
    this.themeService.changeTheme(themeKey);
    this.analyticsService.trackEvent('switchTheme');
    this.popover.hide();
  }
}
