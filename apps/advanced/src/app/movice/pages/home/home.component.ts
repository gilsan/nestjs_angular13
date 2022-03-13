import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/models';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies('popular').subscribe((response) => {
      this.popularMovies = response.results;
      console.log(this.popularMovies);
    });

    this.moviesService.getMovies('top_rated').subscribe((response) => {
      this.topRatedMovies = response.results;
      console.log(this.topRatedMovies);
    });

    this.moviesService.getMovies('upcoming').subscribe((response) => {
      this.upcomingMovies = response.results;
      console.log(this.upcomingMovies);
    });
  }
}
