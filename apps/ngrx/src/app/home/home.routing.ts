import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./course/course.component";
import { CoursesResolver } from "./courses.resolver";
import { CoursesComponent } from "./courses/courses.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'lists', component: CoursesComponent,
        resolve: {
          courses: CoursesResolver
        }
      },
      {
        path: 'lists/:id', component: CourseComponent
      }
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

}
