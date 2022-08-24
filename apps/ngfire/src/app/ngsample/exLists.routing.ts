import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './components/sbook/auth/login/login.component';
import { RegisterComponent } from './components/sbook/auth/register/register.component';
import { MainComponent } from './mainscreen/mainscreen.component';




const routes: Routes = [
  { path: '', component:MainComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'mainscreen', component: MainComponent}
    ] }
];


 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 })
export class ExListsRoutingModule {

}
