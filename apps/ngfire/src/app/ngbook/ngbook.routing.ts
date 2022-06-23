import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgbookComponent } from "./ngbook.component";


const routes: Routes = [
  { path: '', component: NgbookComponent }
];


 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 })


export class NgbookRoutingModule {

}
