import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviceComponent } from './movice.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';

// 1a462d2b22be9763fbac1f03ea32dad9
// https://api.themoviedb.org/3/movie/550?api_key=1a462d2b22be9763fbac1f03ea32dad9

const routes: Routes = [
  {
    path: '',
    component: MoviceComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'movies', component: MoviesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviceRoutingModule {}