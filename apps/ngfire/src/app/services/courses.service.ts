import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { concatMap, map, shareReplay, tap } from 'rxjs/operators';
import { ICOURSE } from '../models/course.model';
import { ILESSON } from '../models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

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
}
