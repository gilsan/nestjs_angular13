import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(file: File | null, path: string): AngularFireUploadTask {
    const filePath = `clips/${path}.mp4`;
    const task = this.storage.upload(filePath, file);
    return task;
  }
}
