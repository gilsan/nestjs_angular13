import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PrimengModule } from './primeng.module';
import { VideochatComponent } from './home/videochat/videochat.component';
import { ChatComponent } from './home/chat/chat.component';


@NgModule({
  declarations: [AppComponent, ChatComponent, VideochatComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
