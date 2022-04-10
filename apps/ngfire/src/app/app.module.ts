import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppComponent } from './app.component';
import { PrimengModule } from './primeng.module';
import { AppRoutingModule } from './app-routing.module';

import { AboutComponent } from './about/about.component';
import { HomeModule } from './home/home.module';
import { HeaderComponent } from './shared/header/header.component';
import { CourseResolver } from './services/course.resolver';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LearncssComponent } from './learncss/learncss.component';

@NgModule({
  declarations: [AppComponent, AboutComponent, HeaderComponent, CreateUserComponent, LoginComponent, SidebarComponent, LearncssComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    PrimengModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    HomeModule,
  ],
  providers: [
    CourseResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
