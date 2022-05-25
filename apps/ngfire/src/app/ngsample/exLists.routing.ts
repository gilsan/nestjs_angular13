import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './components/sbook/sbook-components/login/login.component';




const routes: Routes = [
  { path: '', component:LoginComponent,
    children: [
      { path: 'login', component: LoginComponent}
    ] }
];


 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 })
export class ExListsRoutingModule {

}