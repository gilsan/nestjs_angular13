import { Component, OnInit } from '@angular/core';
import { movie, result } from '../../models/models';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: result[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe((response) => {
      this.movies = response.results;
      console.log(this.movies);
    });
  }
}
