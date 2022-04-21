import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transform2dComponent } from './components/transform2d/transform2d.component';
import { Transform3dComponent } from './components/transform3d/transform3d.component';
import { ButtonEffectsComponent } from './components/button-effects/button-effects.component';
import { ImageEffectsComponent } from './components/image-effects/image-effects.component';
import { MenuEffectsComponent } from './components/menu-effects/menu-effects.component';
import { CardsEffectsComponent } from './components/cards-effects/cards-effects.component';



@NgModule({
  declarations: [
    Transform2dComponent,
    Transform3dComponent,
    ButtonEffectsComponent,
    ImageEffectsComponent,
    MenuEffectsComponent,
    CardsEffectsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CssAnimationModule { }
