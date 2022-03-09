import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PrimengModule } from './primeng.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { ScreenComponent } from './home/components/screen/screen.component';
import { RtcwindowComponent } from './home/components/rtcwindow/rtcwindow.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EntityDataModule } from '@ngrx/data';
@NgModule({
  declarations: [AppComponent, HomeComponent, ScreenComponent, RtcwindowComponent],
  imports: [
    BrowserModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

}
