import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: MenuItem[];
  barItems: MenuItem[];
  activeItem: MenuItem;
  index = 0;
  courses$: Observable<Course[]>;

  beginnersCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: '기본과정',
        icon: 'pi pi-fw pi-home',
        tabindex: '0',
        command: (event) => {
          this.index = 0;
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

    this.activeItem = this.items[0];
  }

  tabContent(item: MenuItem) {
    console.log(item.tabindex);
  }
}
