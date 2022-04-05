import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'recover',
    component: RecoverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
