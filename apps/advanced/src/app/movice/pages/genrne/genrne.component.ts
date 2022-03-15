import { Component, OnInit } from '@angular/core';
import { GENRES } from '../../models/models';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-genrne',
  templateUrl: './genrne.component.html',
  styleUrls: ['./genrne.component.scss'],
})
export class GenrneComponent implements OnInit {
  genres: GENRES[] = [];
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.initLoad();
  }

  initLoad() {
    this.moviesService.getMovieGenres().subscribe((data) => {
      this.genres = data;
      console.log(data);
    });
  }
}
