
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Transform2dComponent } from './components/transform2d/transform2d.component';
import { Transform3dComponent } from './components/transform3d/transform3d.component';
import { ButtonEffectsComponent } from './components/button-effects/button-effects.component';
import { ImageEffectsComponent } from './components/image-effects/image-effects.component';
import { MenuEffectsComponent } from './components/menu-effects/menu-effects.component';
import { CardsEffectsComponent } from './components/cards-effects/cards-effects.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
   { path: '', component: HomeComponent,
  children: [
    { path: '2d', component: Transform2dComponent},
    { path: '3d', component: Transform3dComponent},
    { path: 'menuHover', component: ButtonEffectsComponent},
    { path: 'images', component: ImageEffectsComponent},
    { path: 'menus', component: MenuEffectsComponent},
  ] }
];


 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 })
export class CssAnimationRoutingModule {

}
