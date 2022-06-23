import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { PrimengModule } from "../primeng.module";
import { NgbookRoutingModule } from "./ngbook.routing";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbookRoutingModule,
    PrimengModule
  ]
})
export class NgBookModule {

}
