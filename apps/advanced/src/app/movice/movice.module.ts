import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MoviceComponent } from "./movice.component";
import { MoviceRoutingModule } from "./movice.routing";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MoviceRoutingModule
  ],
  declarations: [
    MoviceComponent
  ]
})
export class MoviceModule {

}
