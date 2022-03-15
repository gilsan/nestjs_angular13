import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, take, takeLast, tap } from 'rxjs';
import { Genres, GENRES, TV, TVLIST } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TVshowsService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '1a462d2b22be9763fbac1f03ea32dad9';
  constructor(private http: HttpClient) {}

  getTVs(type: string = 'popular', count: number = 12): Observable<TV[]> {
    return this.http.get<TVLIST>(`${this.baseUrl}tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((data) => {
        return of(data.results.slice(0, count));
      })
    );
  }

  searchTVs(page: number): Observable<TV[]> {
    return this.http.get<TVLIST>(`${this.baseUrl}tv/popular?page=${page}&api_key=${this.apiKey}`).pipe(
      switchMap((data) => {
        return of(data.results);
      })
    );
  }

  getTVGenres(): Observable<GENRES[]> {
    return this.http.get<Genres>(`${this.baseUrl}genre/tv/list?api_key=${this.apiKey}`).pipe(
      switchMap((data) => {
        return of(data.genres);
      })
    );
  }

  getTVByGenreId(id: string, page: number) {
    return this.http
      .get<TVLIST>(`${this.baseUrl}discover/tv?with_genres=${id}&page=${page}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((data) => {
          return of(data.results);
        })
      );
  }

  searcTV(title: string) {
    return this.http.get<TVLIST>(`${this.baseUrl}search/tv?query=${title}&api_key=${this.apiKey}`).pipe(
      switchMap((data) => {
        return of(data.results);
      })
    );
  }
}
