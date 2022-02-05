import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as CoursesActions from './courses.actions';
import * as CoursesFeature from './courses.reducer';
import * as CoursesSelectors from './courses.selectors';

@Injectable()
export class CoursesFacade {


  constructor(private readonly store: Store) { }


  buildCourses() {
    this.store.dispatch(CoursesActions.buildCourseSession());
  }
}
