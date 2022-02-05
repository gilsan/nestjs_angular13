import { createAction, props } from '@ngrx/store';
import { COURSE, TOKEN } from '../../models/courses.model';


export const login = createAction(
  '[LOGIN Page] User Login',
  props<{ token: string }>()
);

export const isAuth = createAction(
  '[LOGIN STATE] Check LoggedIn',
  props<{ isAuth: boolean }>()
)

export const buildCourseSession = createAction('[Courses build] Init');

export const init = createAction('[Courses Page] Init');

export const loadCoursesSuccess = createAction(
  '[Courses build] Init Success',
  props<{ courses: COURSE[] }>()
);

export const loadCoursesFailure = createAction(
  '[Courses build] Init Failure',
  props<{ error: any }>()
);
