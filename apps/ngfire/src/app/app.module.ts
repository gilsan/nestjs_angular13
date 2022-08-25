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
import { HighlightedDirective } from './directives/highlighted.directive';
import { CssAnimationModule } from './css-animation/css-animation.module';
import { TypescriptComponent } from './typescript/typescript.component';
import { StoreModule } from '@ngrx/store';
import { EntityDataModule,  EntityMetadataMap } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { AngularAnimationComponent } from './angular_animation/angularAnimation.component';


@NgModule({
  declarations: [AppComponent, AboutComponent, HeaderComponent, CreateUserComponent, LoginComponent, SidebarComponent, HighlightedDirective, TypescriptComponent, AngularAnimationComponent

  ],
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
    HttpClientModule,
     CssAnimationModule,
     StoreModule.forRoot({}),
     EffectsModule.forRoot([]),
     EntityDataModule.forRoot({}),
  ],
  providers: [CourseResolver],
  bootstrap: [AppComponent],
})
export class AppModule {

}
