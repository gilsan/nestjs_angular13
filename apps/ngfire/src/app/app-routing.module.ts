import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CourseComponent } from './home/components/course/course.component';
import { CoursesComponent } from './home/components/courses/courses.component';
import { CreateCourseComponent } from './home/components/create-course/create-course.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { CourseResolver } from './services/course.resolver';
import { TypescriptComponent } from './typescript/typescript.component';

// import {AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'ngbook',
    loadChildren: () => import('./ngbook/ngbook.module').then((m) => m.NgBookModule)
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
    path: 'unitcourse',
    component: CourseComponent,
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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    loadChildren: () => import('./learncss/learncss.module').then((m) => m.LearncssModule),
  },
  {
    path: 'learncss',
    loadChildren: () => import('./learncss/learncss.module').then((m) => m.LearncssModule),
  },
  {
    path: 'animation',
    loadChildren: () => import('./css-animation/css-animation.module').then((m) => m.CssAnimationModule),
  },
  {
    path: 'sbook',
    loadChildren: () => import('./ngsample/exLists.module').then((m) => m.ExListsModule),
  },
  {
    path: 'typescript',
    component: TypescriptComponent,
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
