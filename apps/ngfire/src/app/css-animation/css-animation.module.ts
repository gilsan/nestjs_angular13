import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transform2dComponent } from './components/transform2d/transform2d.component';
import { Transform3dComponent } from './components/transform3d/transform3d.component';
import { ButtonEffectsComponent } from './components/button-effects/button-effects.component';
import { ImageEffectsComponent } from './components/image-effects/image-effects.component';
import { MenuEffectsComponent } from './components/menu-effects/menu-effects.component';
import { CardsEffectsComponent } from './components/cards-effects/cards-effects.component';
import { CssAnimationRoutingModule } from './cssanimation.routing';
import { HomeComponent } from './components/home/home.component';
import { Animation2Component } from './components/animation2/animation2.component';
import { ClipPathComponent } from './components/clip_path/clipPath.component';
import { CssartComponent } from './components/cssart/cssart.component';
import { Cssart2Component } from './components/cssart2/cssart2.component';
import { Cssart3Component } from './components/cssart3/cssart3.component';
import { Cssart4Component } from './components/cssart4/cssart4.component';
import { AngularAnimationComponent } from './components/angularAnimations/angularBasic/angularAnimation.component';
import { SwiperModule } from 'swiper/angular';
import { EngineComponent } from './components/angularAnimations/angularBasic/engine/engine.component';
import { ThreeBasicComponent } from './components/threejs/engine/basic.component';
// import { NgtCanvas } from '@angular-three/core';

@NgModule({
  declarations: [
    Transform2dComponent,
    Transform3dComponent,
    ButtonEffectsComponent,
    ImageEffectsComponent,
    MenuEffectsComponent,
    CardsEffectsComponent,
    HomeComponent,
    Animation2Component,
    ClipPathComponent,
    CssartComponent,
    Cssart2Component,
    Cssart3Component,
    Cssart4Component,
    AngularAnimationComponent,
    EngineComponent,
    ThreeBasicComponent
  ],
  imports: [
    CommonModule,
    CssAnimationRoutingModule,
    SwiperModule,

  ]
})
export class CssAnimationModule { }
