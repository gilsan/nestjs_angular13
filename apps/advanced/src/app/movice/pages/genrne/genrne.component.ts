import { Component, OnInit } from '@angular/core';
import { GENRES } from '../../models/models';
import { MoviesService } from '../../services/movies.service';
import { TVshowsService } from '../../services/tvshows.service';

@Component({
  selector: 'app-genrne',
  templateUrl: './genrne.component.html',
  styleUrls: ['./genrne.component.scss'],
})
export class GenrneComponent implements OnInit {
  genres: GENRES[] = [];
  tvGenres: GENRES[] = [];

  constructor(private moviesService: MoviesService, private tvService: TVshowsService) {}

  ngOnInit(): void {
    this.initLoad();
  }

  initLoad() {
    this.moviesService.getMovieGenres().subscribe((data) => {
      this.genres = data;
    });

    this.tvService.getTVGenres().subscribe((data) => {
      this.tvGenres = data;
    });
  }
}
