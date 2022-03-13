import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviceComponent } from './movice.component';
import { MoviceRoutingModule } from './movice.routing';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  imports: [CommonModule, FormsModule, MoviceRoutingModule],
  declarations: [
    MoviceComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MoviesComponent,
    SliderComponent,
  ],
})
export class MoviceModule {}
