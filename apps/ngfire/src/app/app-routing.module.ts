import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CoursesComponent } from './home/components/courses/courses.component';
import { CreateCourseComponent } from './home/components/create-course/create-course.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CourseResolver } from './services/course.resolver';

// import {AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'home',
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

  {
    path: 'create-course',
    component: CreateCourseComponent,
  },

  {
    path: 'create-user',
    component: CreateUserComponent,
  },

  {
    path: '',
    component: LoginComponent,
  },

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
