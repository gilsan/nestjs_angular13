import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { COURSE } from '../../models/courses.model';

import * as CoursesActions from './courses.actions';
import { CoursesEntity } from './courses.models';

export const COURSES_FEATURE_KEY = 'courses';

export interface CourseState {
  courses: COURSE[],
  token: string,
  isAuth: boolean,
}

export interface AppState {

}

export interface State extends EntityState<CoursesEntity> {
  selectedId?: string | number; // which Courses record has been selected
  loaded: boolean; // has the Courses list been loaded
  error?: string | null; // last known error (if any)
}

export interface CoursesPartialState {
  readonly [COURSES_FEATURE_KEY]: CourseState;
}

export const initialCoursesState: CourseState = {
  courses: [],
  token: '',
  isAuth: false,
}

const coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.buildCourseSession, (state) => {
    return { ...state }
  }),
  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.courses,
    }
  }),
  on(CoursesActions.loadCoursesFailure, (state, action) => ({
    ...state,
    courses: []
  })),
  on(CoursesActions.login, (state, action) => {
    return { ...state, token: action.token }
  }),
  on(CoursesActions.isAuth, (state, action) => {
    return { ...state, isAuth: action.isAuth }
  })
);



export function reducer(state: CourseState | undefined, action: Action) {
  return coursesReducer(state, action);
}
