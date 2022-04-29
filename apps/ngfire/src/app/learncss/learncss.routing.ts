import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { HomeComponent } from './home/home.component';
import { NatoursComponent } from './natours/natours.component';
import { NexterComponent } from './nexter/nexter.component';
import { TrilloComponent } from './trillo/trillo.component';

const routes: Routes = [
    { path: '', component: HomeComponent ,
        children: [
            { path: 'natours', component: NatoursComponent },
            { path: 'trillo', component: TrilloComponent },
            { path: 'nexter', component: NexterComponent },
            { path: 'grid', component: GridComponent }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnCssRouting {}
