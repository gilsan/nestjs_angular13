import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng.module';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { CouresCardListComponent } from './coures-card-list/coures-card-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCourses from './state/courses.reducer';
import { CoursesEffects } from './state/courses.effects';
import { CoursesFacade } from './state/courses.facade';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { CourseEntityService } from './ngrx-data/course-entity.service';
import { EntityMetadataMap } from "@ngrx/data";
import { CoursesResolver } from './courses.resolver';
import { CoursesDataService } from './ngrx-data/courses-data.service';
import { CourseComponent } from './course/course.component';
import { LessonsDataService } from './ngrx-data/lessons-data.service';
import { LessonsEntityService } from './ngrx-data/lesssons-entity.service';
// import { entityMetaData } from './ngrx-data/entityMetaData';
// import { UsersModule } from '@ngshop/users';

const entityMetaData: EntityMetadataMap = {
  Course: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    }
  },
  Lessons: {}
}


@NgModule({
  declarations: [HomeComponent, CoursesComponent, CouresCardListComponent, CourseComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    HomeRoutingModule,
    StoreModule.forFeature(
      fromCourses.COURSES_FEATURE_KEY,
      fromCourses.reducer
    ),
    EffectsModule.forFeature([CoursesEffects]),
  ],
  providers: [
    CoursesFacade,
    CoursesResolver,
    CourseEntityService,
    CoursesDataService,
    LessonsEntityService,
    LessonsDataService
  ],
})
export class HomeModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private coursesDataService: CoursesDataService,
    private lessonsDataService: LessonsDataService
  ) {
    eds.registerMetadataMap(entityMetaData);
    entityDataService.registerService('Course', coursesDataService);
    entityDataService.registerService('Lessons', lessonsDataService);

  }
}
