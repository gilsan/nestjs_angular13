import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CoursesService } from '../../../services/courses.service';

import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import { ICOURSE } from '../../../models/course.model';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  formGroup: FormGroup;
  iconUrl = '';
  percentageChanges$: Observable<number>;
  courseId: string;
  stateOptions: any[];
  value1: string = 'off';
  // nodes = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  nodes = [{ label: 'BEGINNER' }, { label: 'INTERMEDIATE' }, { label: 'ADVANCED' }];
  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private afs: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      description: ['', [Validators.required]],
      category: ['BEGINNER'],
      url: [''],
      longDescription: [''],
      promo: [false],
      promoStartAt: [null],
    });
    this.stateOptions = [
      { label: 'Off', value: 'off' },
      { label: 'On', value: 'on' },
    ];
  }

  uploadThumbnail(event: Event) {}

  onCreateCourse() {
    const course = this.formGroup.value;

    const timestamp = Timestamp.fromDate(new Date(course.promoStartAt));
    const newCourse: Partial<ICOURSE> = {
      description: this.formGroup.value.description,
      categories: [this.formGroup.value.category],
      url: this.formGroup.value.url,
      longDescription: this.formGroup.value.longDescription,
      promo: this.formGroup.value.promo,
      promoStartAt: timestamp,
    };
    const courseId = this.afs.createId();
    this.courseService
      .createCourse(newCourse, courseId)
      .pipe(
        tap((data) => {
          data.subscribe((data) => {
            console.log('[create]', data);
          });

          this.router.navigate(['/']);
        }),
        catchError((err) => {
          console.log('create course: ', err);
          alert('Error 발생');
          return throwError(() => new Error('에러'));
        })
      )
      .subscribe();
  }
}
