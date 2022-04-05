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
@NgModule({
  declarations: [HomeComponent, CoursesCardListComponent, CoursesComponent, CreateCourseComponent, CourseEditComponent],
  imports: [CommonModule, PrimengModule, ReactiveFormsModule],
  providers: [ConfirmationService, MessageService],
})
export class HomeModule {}
