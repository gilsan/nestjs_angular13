import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { MOVIE } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '1a462d2b22be9763fbac1f03ea32dad9';
  constructor(private http: HttpClient) {}

  getMovies(type: string = 'popular'): Observable<MOVIE> {
    return this.http.get<MOVIE>(`${this.baseUrl}movie/${type}?api_key=${this.apiKey}`);
  }
}
