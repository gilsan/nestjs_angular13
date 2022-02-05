
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, shareReplay, tap } from "rxjs";
import { CoursesFacade } from "../home/state/courses.facade";
import { COURSE } from "../models/courses.model";

import { select, Store, Action } from '@ngrx/store';

import * as CoursesActions from '../home/state/courses.actions';
import * as CoursesFeature from '../home/state/courses.reducer';
import * as CoursesSelectors from '../home/state/courses.selectors';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  url = "http://localhost:3000";


  constructor(
    private http: HttpClient,
    private readonly store: Store
  ) { }

  initAction() {
    this.store.dispatch(CoursesActions.buildCourseSession());
  }


  insertCourse(course: COURSE): Observable<COURSE> {
    return this.http.post<COURSE>(`${this.url}/courses/course/insert`, { ...course });
  }

  getLists(): Observable<COURSE[]> {
    return this.http.get<COURSE[]>(`${this.url}/courses/course/all`)
      .pipe(
        shareReplay()
      );
  }

}
