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
  genreId: string | null = null;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreid }) => {
      if (genreid) {
        this.genreId = genreid;
        this.getMovieByGenreId(genreid, 1);
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

  getMovieByGenreId(genreid: string, page: number) {
    this.moviesService.getMovieByGenreId(genreid, page).subscribe((data) => {
      this.movies = data;
    });
  }

  paginate(event: any) {
    const page = event.page + 1;
    if (this.genreId) {
      this.getMovieByGenreId(this.genreId, page);
    } else {
      this.getPageMovie(page);
    }
  }

  searchChange(title: string) {
    this.moviesService.searcMovice(title).subscribe((data) => {
      this.movies = data;
    });
  }
}
