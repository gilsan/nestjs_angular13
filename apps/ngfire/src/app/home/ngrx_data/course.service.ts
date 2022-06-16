import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { concatMap, map, shareReplay, tap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';


import OrderByDirection = firebase.firestore.OrderByDirection;
import { ICOURSE } from '../../models/course.model';
import { ILESSON } from '../../models/lesson.model';
import { DefaultDataService, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Course } from '../../model/course';
import { defaultFirebaseAppFactory } from '@angular/fire/app/app.module';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends  EntityCollectionServiceBase<Course> {
//
  constructor(
    private db: AngularFirestore,
    serviceElementFactory: EntityCollectionServiceElementsFactory
    ) {
      super('Course', serviceElementFactory);
    }

  loadCoursesByCategory(category: string): Observable<ICOURSE[]> {
    return this.db
      .collection('courses', (ref) => ref.where('categories', 'array-contains', category))
      .get()
      .pipe(
        map((results) => {
          return results.docs.map((snaps) => {
            const id = snaps.id;
            const data = snaps.data();
            return { id, ...(<any>data) };
          });
        })
      );
  }

  getCourse(docID: string): Observable<ICOURSE> {
    return this.db
      .collection('courses')
      .doc(docID)
      .get()
      .pipe(
        map((result) => {
          return { id: docID, ...(<any>result.data()) };
        })
      );
  }

  findLessons(id: string): Observable<ILESSON[]> {
    return this.db
      .collection('courses')
      .doc(id)
      .collection('lessons')
      .get()
      .pipe(
        map((result) => {
          return result.docs.map((snap) => {
            const id = snap.id;
            const data = snap.data();

            return { id, ...(<any>data) };
          });
        })
      );
  }

  createCourse(course: Partial<ICOURSE>, courseId?: string) {
    return this.db
      .collection('courses', (ref) => ref.orderBy('seqNo', 'desc').limit(1))
      .get()
      .pipe(
        concatMap((result) => {
          return result.docs.map((snap) => {
            const data = snap.data();

            const seqno = data['seqNo'] ?? 0;
            const newCourse = {
              seqNo: seqno + 1,
              ...course,
            };

            let save$: Observable<any>;
            if (courseId) {
              save$ = from(this.db.collection('courses').doc(courseId).set(newCourse));
            } else {
              save$ = from(this.db.collection('courses').add(newCourse));
            }

            return save$.pipe(
              tap((res) => console.log('[서비스]', res)),
              map((res) => {
                return { id: courseId ?? res.id, ...newCourse };
              })
            );
          });
        })
      );
  }

  changeCourse(course: Partial<ICOURSE>, id: string): Observable<any> {
    return from(this.db.collection('courses').doc(id).update(course));
  }

  deleteCourse(courseId: string): Observable<any> {
    return from(this.db.doc(`courses/${courseId}`).delete());
  }

  deleteCourseAndLessons(courseId: string): Observable<any> {
    return this.db
      .collection(`courses/${courseId}/lessons`)
      .get()
      .pipe(
        concatMap((results) => {
          const lessons = results.docs.map((snap) => {
            return { lessonsid: snap.id, ...(<any>snap.data()) };
          });
          const courseRef = this.db.doc(`courses/${courseId}`).ref;
          const batch = this.db.firestore.batch();
          batch.delete(courseRef);
          for (let lesson of lessons) {
            const lessonRef = this.db.doc(`courses/${courseId}/lessons/${lesson.lessonsid}`).ref;
            batch.delete(lessonRef);
          }
          return from(batch.commit());
        })
      );
  }

  findLessonsPage(
    courseId: string,
    page = 0,
    pagesize = 3,
    sortOrder: OrderByDirection = 'asc'
  ): Observable<ILESSON[]> {
    return this.db
      .collection(`courses/${courseId}/lessons`, (ref) =>
        ref
          .orderBy('seqNo', sortOrder)
          .limit(3)
          .startAfter(page * pagesize)
      )
      .get()
      .pipe(
        map((results) => {
          return results.docs.map((snap) => {
            const id = snap.id;
            const data = snap.data();
            return { id, ...(<any>data) };
          });
        })
      );
  }
}
