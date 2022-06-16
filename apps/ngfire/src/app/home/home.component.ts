import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

import { ICOURSE } from '../models/course.model';
import { AuthService } from '../services/auth.service';
import { CourseService } from './ngrx_data/course.service';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: MenuItem[];
  barItems: MenuItem[];
  activeItem: MenuItem;
  index = 0;
  courses: ICOURSE[] = [];

  beginnersCourses$: Observable<ICOURSE[]>;

  advancedCourses$: Observable<ICOURSE[]>;

  constructor(private router: Router,
    public courseService: CoursesService,
    private messageService: MessageService,
    private auth: AuthService ) {}

  ngOnInit() {
    this.items = [
      {
        label: '로그아웃',
        icon: 'pi pi-fw pi-sign-out',
        tabindex: '0',
        command: (event) => {
          this.index = 0;
          this.auth.signOut();
        },
      }, // , routerLink: ['/pagename']
      {
        label: '고급과정',
        icon: 'pi pi-fw pi-calendar',
        tabindex: '1',
        command: (event) => {
          this.index = 1;
        },
      },
    ];

   // this.activeItem = this.items[0];

    this.getCourse();
    this.currentUser();
  }

  currentUser() {
    this.auth.currentUser().then((data) => {
      if (data !== null) {
        console.log('[사용자정보]', data.email, data.uid);
      }

    })


  }

  getCourse() {
    this.beginnersCourses$ = this.courseService.loadCoursesByCategory('BEGINNER');
    this.advancedCourses$ = this.courseService.loadCoursesByCategory('ADVANCED');
  }

  tabContent(item: MenuItem) {
    console.log(item.tabindex);
  }
}
