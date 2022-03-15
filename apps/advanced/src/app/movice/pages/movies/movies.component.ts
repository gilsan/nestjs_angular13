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
    this.getPageMovie(1);
  }

  getPageMovie(page: number) {
    this.moviesService.searchMovies(page).subscribe((data) => {
      this.movies = data;
    });
  }

  paginate(event: any) {
    this.getPageMovie(event.page + 1);
  }
}
