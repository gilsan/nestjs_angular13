import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng.module';
@NgModule({
  declarations: [ManageComponent, UploadComponent],
  imports: [CommonModule, ReactiveFormsModule, VideoRoutingModule, SharedModule, PrimengModule],
})
export class VideoModule {}
