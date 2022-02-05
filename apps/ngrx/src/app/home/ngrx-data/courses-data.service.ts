import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable, shareReplay, tap } from "rxjs";
import { COURSE } from "../../models/courses.model";

@Injectable()
export class CoursesDataService extends DefaultDataService<COURSE> {

  url = "http://localhost:3000";
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Course', http, httpUrlGenerator);
  }

  getLists(): Observable<COURSE[]> {
    return this.http.get<COURSE[]>(`${this.url}/courses/course/all`)
      .pipe(
        shareReplay()
      );
  }


  override getAll(): Observable<COURSE[]> {
    return this.http.get<COURSE[]>(`${this.url}/courses/course/all`)
  }

  override update(course): Observable<COURSE> {
    return this.http.put<COURSE>(`${this.url}/courses/course/update`, { ...course })
  }


}
