import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { CourseResolver } from './services/course.resolver';
// import {AboutComponent} from './about/about.component';
// import {CourseComponent} from './course/course.component';
// import {LoginComponent} from './login/login.component';
// import {CreateCourseComponent} from './create-course/create-course.component';
// import {AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
// import {CreateUserComponent} from './create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
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
  /*
  {
    path: 'create-course',
    component: CreateCourseComponent

  },
  {
    path: 'create-user',
    component: CreateUserComponent

  },

  {
    path: 'login',
    component: LoginComponent
  },

  */
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
