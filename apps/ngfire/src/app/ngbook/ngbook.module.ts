import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { PrimengModule } from "../primeng.module";
import { NgbookComponent } from "./ngbook.component";
import { NgbookRoutingModule } from "./ngbook.routing";
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    NgbookComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbookRoutingModule,
    PrimengModule
  ]
})
export class NgBookModule {

}
