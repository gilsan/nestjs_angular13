import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, take, takeLast, tap } from 'rxjs';
import { CONF, Movie, MOVIE, TV, TVLIST } from '../models/models';

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

  getConfigure(): Observable<CONF> {
    return this.http.get<CONF>(`${this.baseUrl}configuration?api_key=${this.apiKey}`);
  }
}
