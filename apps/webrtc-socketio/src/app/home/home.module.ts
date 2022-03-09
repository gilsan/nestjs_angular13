import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimengModule } from "../primeng.module";
import { HomeRoutingModule } from "./home-routing.module";
import { MainComponent } from './components/main/main.component';

import { StoreModule } from '@ngrx/store';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { EntityMetadataMap } from "@ngrx/data";


const entityMetaData: EntityMetadataMap = {
  Socket: {}
}



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    HttpClientModule,

  ]
})
export class HomeModule {

  constructor(
    private eds: EntityDefinitionService
  ) {
    eds.registerMetadataMap(entityMetaData)
  }
}
