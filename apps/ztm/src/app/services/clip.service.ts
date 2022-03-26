import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IClip } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  clipCollection: AngularFirestoreCollection<IClip>;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.clipCollection = db.collection('clips');
  }

  addClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipCollection.add(clip);
  }

  getUserClip() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const query = this.clipCollection.ref.where('uid', '==', user.uid);
        return query.get();
      })
    );
  }

  updateClip(id: string, title: string) {
    return this.clipCollection.doc(id).update({ title });
  }
}
