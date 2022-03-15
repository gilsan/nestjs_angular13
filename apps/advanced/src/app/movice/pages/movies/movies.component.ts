import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Movie } from '../../models/models';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreid }) => {
      if (genreid) {
        this.getMovieByGenreId(genreid);
      } else {
        this.getPageMovie(1);
      }
    });
  }

  getPageMovie(page: number) {
    this.moviesService.searchMovies(page).subscribe((data) => {
      this.movies = data;
    });
  }

  getMovieByGenreId(id: number) {}

  paginate(event: any) {
    this.getPageMovie(event.page + 1);
  }
}
