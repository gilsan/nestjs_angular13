import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/models';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.searchMovies(2).subscribe((data) => {
      this.movies = data;
    });
  }

  //
  paginate(page: number) {}
}
