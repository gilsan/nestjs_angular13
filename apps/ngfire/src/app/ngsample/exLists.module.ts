import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";



import { PrimengModule } from "../primeng.module";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/sbook/auth/login/login.component";
import { RegisterComponent } from "./components/sbook/auth/register/register.component";
import { ExListsRoutingModule } from "./exLists.routing";
import { MainComponent } from "./mainscreen/mainscreen.component";
import { ProgressBarDirective } from "./mainscreen/widthDirective";



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ProgressBarDirective
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
