import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NatoursComponent } from './natours/natours.component';
import { LearnCssRouting } from './learncss.routing';
import { TrilloComponent } from './trillo/trillo.component';
import { NexterComponent } from './nexter/nexter.component';
import { HomeComponent } from './home/home.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [NatoursComponent, TrilloComponent, NexterComponent, HomeComponent, GridComponent],
  imports: [CommonModule, LearnCssRouting],
})
export class LearncssModule {}
