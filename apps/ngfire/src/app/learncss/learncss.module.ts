import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NatoursComponent } from './natours/natours.component';
import { LearnCssRouting } from './learncss.routing';

@NgModule({
  declarations: [NatoursComponent],
  imports: [CommonModule, LearnCssRouting],
})
export class LearncssModule {}
