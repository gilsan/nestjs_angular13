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
  pageClips: IClip[] = [];
  pendingReq = false;
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

  async getClips() {
    let lastDoc;
    if (this.pendingReq) {
      return;
    }
    this.pendingReq = true;
    let query = this.clipCollection.ref.orderBy('timestamp', 'desc').limit(6);

    const { length } = this.pageClips;
    if (length) {
      const lastDocID = this.pageClips[length - 1].docID;
      await this.clipCollection
        .doc(lastDocID)
        .get()
        .forEach((doc) => {
          lastDoc = doc;
        });
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();

    (await snapshot).forEach((doc) => {
      console.log('service ', doc.data());
      this.pageClips.push({
        docID: doc.id,
        ...doc.data(),
      });
    });

    this.pendingReq = false;
  }
}
