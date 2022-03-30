import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { NavComponent } from './home/nav/nav.component';
import { AboutModule } from './about/about.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ClipComponent } from './clip/clip.component';
import { VideoModule } from './video/video.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipsListComponent } from './home/components/clips-list/clips-list.component';
import { FbTimestampPipe } from './home/pipes/fb-timestamp.pipe';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavComponent, ClipComponent, ClipsListComponent, FbTimestampPipe],
  imports: [
    BrowserModule,
    UserModule,
    AboutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    VideoModule,
    AppRoutingModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
