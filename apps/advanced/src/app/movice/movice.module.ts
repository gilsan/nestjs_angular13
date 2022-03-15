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
import { PrimengModule } from '../primeng.module';
import { MovieComponent } from './pages/movie/movie.component';
import { VideoEmbedComponent } from './components/video-embed/video-embed.component';
import { GenrneComponent } from './pages/genrne/genrne.component';
import { TvshowsComponent } from './pages/tvshows/tvshows.component';

@NgModule({
  imports: [CommonModule, FormsModule, MoviceRoutingModule, PrimengModule],
  declarations: [
    MoviceComponent,
    HeaderComponent,

    HomeComponent,
    MoviesComponent,
    SliderComponent,
    ItemsBannerComponent,
    MovieItemComponent,
    MovieComponent,
    VideoEmbedComponent,
    GenrneComponent,
    TvshowsComponent,
  ],
})
export class MoviceModule {}
