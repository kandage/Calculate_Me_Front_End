import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecurityComponent} from './security.component';
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {ForgetPasswordComponent} from "./components/forget-password/forget-password.component";

const routes: Routes = [
  {
    path: '', component: SecurityComponent, children: [
      {path: '', redirectTo: '/security/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignUpComponent},
      {path: 'forget-password', component: ForgetPasswordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
}
