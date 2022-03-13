import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { movie } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<movie> {
    return this.http.get<movie>('https://api.themoviedb.org/3/movie/upcoming?api_key=1a462d2b22be9763fbac1f03ea32dad9');
  }
}
