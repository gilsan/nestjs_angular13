import { createFeatureSelector, createSelector } from '@ngrx/store';
import { COURSES_FEATURE_KEY, CoursesPartialState, CourseState } from './courses.reducer';

// Lookup the 'Courses' feature state managed by NgRx
export const getCoursesState =
  createFeatureSelector<CourseState>(COURSES_FEATURE_KEY);

export const getCourses = createSelector(getCoursesState, (state) => state.courses);
export const loggedIn = createSelector(
  getCoursesState,
  state => state.courses
);

export const isLoggedIn = createSelector(
  getCoursesState,
  state => state.isAuth
);



// export const tokenLength = createSelector(

//   loggedIn,
//   (state) => state.token.length
// )



// const { selectAll, selectEntities } = coursesAdapter.getSelectors();

// export const getCoursesLoaded = createSelector(
//   getCoursesState,
//   (state: State) => state.loaded
// );

// export const getCoursesError = createSelector(
//   getCoursesState,
//   (state: State) => state.error
// );

// export const getAllCourses = createSelector(getCoursesState, (state: State) =>
//   selectAll(state)
// );

// export const getCoursesEntities = createSelector(
//   getCoursesState,
//   (state: State) => selectEntities(state)
// );

// export const getSelectedId = createSelector(
//   getCoursesState,
//   (state: State) => state.selectedId
// );

// export const getSelected = createSelector(
//   getCoursesEntities,
//   getSelectedId,
//   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// );
