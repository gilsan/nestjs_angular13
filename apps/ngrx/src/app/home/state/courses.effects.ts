import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { concatMap, filter, map, noop, of, tap } from 'rxjs';
import { COURSE } from '../../models/courses.model';
import { CoursesService } from '../../services/courses.service';

import * as CoursesActions from './courses.actions';
import * as CoursesFeature from './courses.reducer';

@Injectable()
export class CoursesEffects {

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.init),
      // filter(data => data.type === "[Courses build] Init"),
      concatMap((action) => this.coursesService.getLists()),
      map((courses: COURSE[]) => {
        return CoursesActions.loadCoursesSuccess({ courses });
      }),
      // tap(data => console.log('[EFFECT] ', data)),
    ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private coursesService: CoursesService) {
  }
}
