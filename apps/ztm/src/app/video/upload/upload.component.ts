import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { last, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { StorageService } from '../../services/storage.service';
import { ClipService } from '../../services/clip.service';
import { IClip } from '../../models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'ngshop-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  isDragover = false;
  file: File | null = null;
  progress$: Observable<number | undefined> = new Observable();
  nextStep = false;
  progress = 0;
  formGroup: FormGroup = this.fb.group({
    title: [],
  });

  user: firebase.User | null = null;
  task?: AngularFireUploadTask;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private storageService: StorageService,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private clipService: ClipService,
    private router: Router
  ) {
    auth.user.subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.task?.cancel();
  }

  storeFile(event: Event) {
    // console.log((event.target as HTMLInputElement).files?.item(0));
    this.isDragover = false;
    this.file = (event as DragEvent).dataTransfer
      ? (event as DragEvent).dataTransfer?.files.item(0) ?? null
      : (event.target as HTMLInputElement).files?.item(0) ?? null;

    if (this.file) {
      if (this.file?.type !== 'video/webm' || !this.file) {
        return;
      }
    }
    this.formGroup.get('title')?.setValue(this.file?.name.split('.')[0]);
    this.nextStep = true;
  }

  uploadFile() {
    this.formGroup.disable();
    const upload = this.storageService.uploadFile(this.file, this.file?.name.split('.')[0] ?? '');
    this.task = upload;
    this.task.percentageChanges().subscribe((data) => {
      if (data) {
        this.progress = parseInt(data.toFixed(0), 10);
      }
    });
    const clipRef = this.storage.ref(`clips/${this.file?.name.split('.')[0]}.mp4`);
    this.task
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => clipRef.getDownloadURL())
      )
      .subscribe({
        next: async (url) => {
          this.messageService.add({ severity: 'success', summary: '완료', detail: '파일 올리기를 마쳤습니다.' });

          const clip: IClip = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.file?.name.split('.')[0] as string,
            filename: this.file?.name.split('.')[0] + '.mp4',
            url,
          };

          const docRef = await this.clipService.addClip(clip);
          setTimeout(() => {
            this.router.navigate(['clip', docRef.id]);
          }, 1000);
        },
        error: (err) => {
          this.formGroup.enable();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: '파일 올리기 실패' });
        },
      });
  }
}
