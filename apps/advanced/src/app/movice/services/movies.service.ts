import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, take, takeLast, tap } from 'rxjs';
import {
  CONF,
  MOVICEDETAIL,
  Movie,
  MOVIE,
  TV,
  TVLIST,
  Video,
  Image,
  Credit,
  Similar,
  GENRES,
  Genres,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '1a462d2b22be9763fbac1f03ea32dad9';
  constructor(private http: HttpClient) {}

  getMovies(type: string = 'popular', count: number = 12): Observable<Movie[]> {
    return this.http.get<MOVIE>(`${this.baseUrl}movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((data) => {
        return of(data.results.slice(0, count));
      })
    );
  }

  getTV(type: string = 'popular'): Observable<TV[]> {
    return this.http.get<TVLIST>(`${this.baseUrl}tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((data) => {
        return of(data.results.slice(0, 12));
      })
    );
  }

  searchMovies(page: number): Observable<Movie[]> {
    return this.http.get<MOVIE>(`${this.baseUrl}movie/popular?page=${page}&api_key=${this.apiKey}`).pipe(
      switchMap((data) => {
        return of(data.results);
      })
    );
  }

  getDetailMovie(id: string): Observable<MOVICEDETAIL> {
    return this.http.get<MOVICEDETAIL>(`${this.baseUrl}movie/${id}?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: string): Observable<Video> {
    return this.http.get<Video>(`${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}`);
  }

  getMovieImages(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.baseUrl}movie/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieCredits(id: string): Observable<Credit> {
    return this.http.get<Credit>(`${this.baseUrl}movie/${id}/credits?api_key=${this.apiKey}`);
  }

  getMovieSimilar(id: string): Observable<Movie[]> {
    return this.http.get<MOVIE>(`${this.baseUrl}movie/${id}/similar?api_key=${this.apiKey}`).pipe(
      switchMap((data) => {
        return of(data.results);
      })
    );
  }

  getConfigure(): Observable<CONF> {
    return this.http.get<CONF>(`${this.baseUrl}configuration?api_key=${this.apiKey}`);
  }

  getMovieGenres(): Observable<GENRES[]> {
    return this.http.get<Genres>(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`).pipe(
      switchMap((data) => {
        return of(data.genres);
      })
    );
  }
  getMovieByGenreId(id: string, page: number) {
    return this.http
      .get<MOVIE>(`${this.baseUrl}discover/movie?with_genres=${id}&page=${page}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((data) => {
          return of(data.results);
        })
      );
  }

  searcMovice(title: string) {
    return this.http.get<MOVIE>(`${this.baseUrl}search/movie?query=${title}&api_key=${this.apiKey}`).pipe(
      switchMap((data) => {
        return of(data.results);
      })
    );
  }
}
