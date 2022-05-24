import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";



import { PrimengModule } from "../primeng.module";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/sbook/sbook-components/login/login.component";
import { ExListsRoutingModule } from "./exLists.routing";



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ExListsRoutingModule,
    PrimengModule
  ]
})
export class ExListsModule {

}
