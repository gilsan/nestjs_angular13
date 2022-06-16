import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimengModule } from '../primeng.module';
import { CoursesCardListComponent } from './components/courses-card-list/courses-card-list.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HomeComponent } from './home.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CourseComponent } from './components/course/course.component';
import { HomeRoutingModule } from './home.routing';
import { EntityDefinitionService } from '@ngrx/data';
import { entityMetaData } from './ngrx_data/ngrxDataConfig';
import { CourseResolver } from '../services/course.resolver';
@NgModule({
  declarations: [HomeComponent, CoursesCardListComponent, CoursesComponent, CreateCourseComponent, CourseEditComponent, CourseComponent],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    HomeRoutingModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    CourseResolver],
})
export class HomeModule {
  constructor(private eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetaData);
  }
}
