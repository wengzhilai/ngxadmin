import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AuthRoutingModule
  ],
  declarations: [AuthLoginComponent,routedComponents]
})
export class AuthModule { }
