import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthLoginComponent } from "./auth-login/auth-login.component";
import { AuthRegisterComponent } from './auth-register/auth-register.component';


const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
    path: 'login',
    component: AuthLoginComponent,
  },{
    path: 'register',
    component: AuthRegisterComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

//用于导入到模块
export const routedComponents = [
  AuthComponent,
  AuthLoginComponent,
  AuthRegisterComponent,
];