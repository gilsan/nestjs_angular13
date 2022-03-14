import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie, TV } from '../../models/models';
import { MoviesService } from '../../services/movies.service';
import { SubSink } from 'subsink';
import { filter, Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  popularMovies$: Observable<Movie[]>;
  topRatedMovies$: Observable<Movie[]>;
  upcomingMovies$: Observable<Movie[]>;
  popularTVs$: Observable<TV[]>;

  private subs = new SubSink();
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.initLoad();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initLoad() {
    this.subs.sink = this.moviesService.getConfigure().subscribe((data) => {
      // console.log(data);
    });
    this.popularMovies$ = this.moviesService.getMovies('popular');
    this.topRatedMovies$ = this.moviesService.getMovies('top_rated');
    this.upcomingMovies$ = this.moviesService.getMovies('upcoming');

    this.popularTVs$ = this.moviesService.getTV().pipe(filter((data) => !!data));
  }
}
