import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMAGE_SIZES } from '../../constant/constant';
import { MOVICEDETAIL, Movie, Video, Image, Credit, Similar, VIDEO, BACKDROP } from '../../models/models';
import { MoviesService } from '../../services/movies.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  item$: Observable<Movie>;
  item: MOVICEDETAIL;
  movieVideos: VIDEO[] = [];
  movieImages: Image = null;
  movieCredits: Credit = null;
  movieSimilar: Movie[] = [];
  private subs = new SubSink();

  readonly imageSize = IMAGE_SIZES;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initData() {
    const idx = this.route.snapshot.paramMap.get('id');
    this.subs.sink = this.moviesService.getDetailMovie(idx).subscribe((data) => {
      this.item = data;
    });

    this.subs.sink = this.moviesService.getMovieVideos(idx).subscribe((data) => {
      this.movieVideos = data.results;
    });

    this.subs.sink = this.moviesService.getMovieImages(idx).subscribe((data) => {
      this.movieImages = data;
    });

    this.subs.sink = this.moviesService.getMovieCredits(idx).subscribe((data) => {
      this.movieCredits = data;
    });

    this.subs.sink = this.moviesService.getMovieSimilar(idx).subscribe((data) => {
      this.movieSimilar = data;
    });
  }
}
