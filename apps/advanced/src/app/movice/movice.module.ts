import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviceComponent } from './movice.component';
import { MoviceRoutingModule } from './movice.routing';
import { HeaderComponent } from './shared/header/header.component';

import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { SliderComponent } from './components/slider/slider.component';
import { ItemsBannerComponent } from './components/items-banner/items-banner.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';

@NgModule({
  imports: [CommonModule, FormsModule, MoviceRoutingModule],
  declarations: [
    MoviceComponent,
    HeaderComponent,

    HomeComponent,
    MoviesComponent,
    SliderComponent,
    ItemsBannerComponent,
    MovieItemComponent,
  ],
})
export class MoviceModule {}
