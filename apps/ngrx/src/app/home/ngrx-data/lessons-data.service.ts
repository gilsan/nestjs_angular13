import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { Observable, of, shareReplay, tap } from "rxjs";
import { LESSON } from "../../models/courses.model";

@Injectable()
export class LessonsDataService extends DefaultDataService<LESSON> {

  url = "http://localhost:3000";
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Lessons', http, httpUrlGenerator);
  }


  override getAll(): Observable<LESSON[]> {
    return this.http.get<LESSON[]>(`${this.url}/lessons/lesson/all`);
  }

  override add(lesson: LESSON): Observable<LESSON> {
    return this.http.post<LESSON>(`${this.url}/lessons/lesson/insert`, { ...lesson });
  }

  override getWithQuery(page: { courseId: string, page: string, perPage: string }): Observable<LESSON[]> {
    console.log('[getWithQuery]', page);
    const params = new HttpParams()
      .set('courseId', page.courseId)
      .set('page', page.page)
      .set('perPage', page.perPage);
    return this.http.get<LESSON[]>(`${this.url}/lessons/lesson/page`, { params });
  }





}
