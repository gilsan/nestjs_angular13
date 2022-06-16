import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateUserComponent } from "../create-user/create-user.component";

import { CourseComponent } from "./components/course/course.component";
import { CoursesComponent } from "./components/courses/courses.component";
import { CreateCourseComponent } from "./components/create-course/create-course.component";
import { HomeComponent } from "./home.component";
import { CourseResolver } from "./ngrx_data/course.resolver";


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'unitcourse',
        component: CourseComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,

      },
      {
        path: 'courses/:id',
        component: CoursesComponent,
        resolve: {
          course: CourseResolver,
        },
      },
      {
        path: 'create-course',
        component: CreateCourseComponent,
      },

      {
        path: 'create-user',
        component: CreateUserComponent,
      },
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
