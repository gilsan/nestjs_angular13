import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IClip } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  clipCollection: AngularFirestoreCollection<IClip>;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private storage: AngularFireStorage) {
    this.clipCollection = db.collection('clips');
  }

  addClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipCollection.add(clip);
  }

  getUserClip(sort$: BehaviorSubject<string>) {
    return combineLatest([sort$, this.auth.user]).pipe(
      switchMap((values) => {
        const [sort, user] = values;
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

  async deleteClip(clip: IClip) {
    const ref = this.storage.ref(`clips/${clip.filename}`);
    await ref.delete();
    await this.clipCollection.doc(clip.docID).delete();
  }
}
