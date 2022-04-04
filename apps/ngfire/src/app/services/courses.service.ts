import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ICOURSE } from '../models/course.model';

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
}
