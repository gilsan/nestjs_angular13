import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimengModule } from '../primeng.module';
import { CoursesCardListComponent } from './components/courses-card-list/courses-card-list.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, CoursesCardListComponent],
  imports: [CommonModule, PrimengModule],
})
export class HomeModule {}
