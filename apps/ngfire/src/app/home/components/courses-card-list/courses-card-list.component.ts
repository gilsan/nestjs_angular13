import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ICOURSE } from '../../../models/course.model';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: ICOURSE[] = [];
  @Output() editcourse = new EventEmitter();
  @Output() deletecourse = new EventEmitter();

  display = false;
  course: Partial<ICOURSE> = {
    description: '',
    url: '',
    longDescription: '',
    promo: false,
  };
  constructor(
    private courseService: CoursesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  viewContent() {
    console.log('view...');
  }

  editCourse(course: ICOURSE) {
    this.course = course;
    this.display = true;
  }

  saveCourse() {
    const { id, ...course } = this.course;

    this.courseService.changeCourse(course, id).subscribe(() => {
      this.editcourse.emit('');
      this.display = false;
    });
  }

  deleteCourse(courseId: string, event) {
    this.confirmationService.confirm({
      target: event.target,
      message: '삭제 하시겠습니까?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService
          .deleteCourseAndLessons(courseId)
          .pipe(
            tap(() => {
              this.deletecourse.emit('');
            }),
            catchError((err) => {
              this.messageService.add({ severity: 'info', summary: '에러', detail: '삭제실패.' });
              return throwError(() => new Error(err));
            })
          )
          .subscribe(() => {
            this.messageService.add({ severity: 'info', summary: '삭제', detail: '삭제 하였습니다.' });
          });
      },
      reject: () => {
        return;
      },
    });
  }

  onCancel() {
    this.display = false;
  }
}
