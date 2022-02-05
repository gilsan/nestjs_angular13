import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user.route';
import { PrimengModule } from './primeng.module';
import { EntityMetadataMap } from "@ngrx/data";
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { UserEntityService } from './ngrx-data/user-entity.service';
import { UserDataService } from './ngrx-data/user-data.service';

const entityMetaData: EntityMetadataMap = {
  User: {}
}


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    PrimengModule,

  ],
  declarations: [LoginComponent],
  providers: [
    UserEntityService,
    UserDataService

  ],
})
export class UsersModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private userDataService: UserDataService,

  ) {
    eds.registerMetadataMap(entityMetaData);
    entityDataService.registerService('User', userDataService);
  }
}
