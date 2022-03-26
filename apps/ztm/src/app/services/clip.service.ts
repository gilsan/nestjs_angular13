import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IClip } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  clipCollection: AngularFirestoreCollection<IClip>;
  constructor(private db: AngularFirestore) {
    this.clipCollection = db.collection('clips');
  }

  addClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipCollection.add(clip);
  }
}
