
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Transform2dComponent } from './components/transform2d/transform2d.component';
import { Transform3dComponent } from './components/transform3d/transform3d.component';
import { ButtonEffectsComponent } from './components/button-effects/button-effects.component';
import { ImageEffectsComponent } from './components/image-effects/image-effects.component';
import { MenuEffectsComponent } from './components/menu-effects/menu-effects.component';
import { CardsEffectsComponent } from './components/cards-effects/cards-effects.component';
import { HomeComponent } from './components/home/home.component';
import { SmokyComponent } from './components/smoky/smoky.component';
import { AnimationsComponent } from './components/animations/animations.component';
import { Animation2Component } from './components/animation2/animation2.component';
import { ClipPathComponent } from './components/clip_path/clipPath.component';
import { CssartComponent } from './components/cssart/cssart.component';
import { Cssart2Component } from './components/cssart2/cssart2.component';
import { Cssart3Component } from './components/cssart3/cssart3.component';
import { Cssart4Component } from './components/cssart4/cssart4.component';


const routes: Routes = [
   { path: '', component: HomeComponent,
  children: [
    { path: '2d', component: Transform2dComponent},
    { path: '3d', component: Transform3dComponent},
    { path: 'menuHover', component: ButtonEffectsComponent},
    { path: 'images', component: ImageEffectsComponent},
    { path: 'menus', component: MenuEffectsComponent},
    { path: 'cards', component: CardsEffectsComponent},
    { path: 'smoky', component: SmokyComponent},
    { path: 'animate', component: AnimationsComponent},
    { path: 'animate2', component: Animation2Component},
    { path: 'animate3', component: ClipPathComponent},
    { path: 'cssart1', component: CssartComponent},
    { path: 'cssart2', component: Cssart2Component},
    { path: 'cssart3', component: Cssart3Component},
    { path: 'cssart4', component: Cssart4Component}

  ] }
];


 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 })
export class CssAnimationRoutingModule {

}
