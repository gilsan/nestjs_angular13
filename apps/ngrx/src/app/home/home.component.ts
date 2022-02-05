import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { COURSES } from './courses/datas';
import { COURSE } from '../models/courses.model';
import { BehaviorSubject, filter, from, map, noop, Observable, of, take, takeLast, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { isAuth } from './state/courses.actions';
import { LessonsEntityService } from './ngrx-data/lesssons-entity.service';


@Component({
  selector: 'ngrx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: '교육과정',
      items: [{
        label: '신규',
        icon: 'pi pi-fw pi-plus',
        items: [
          { label: 'Project' },
          { label: 'Other' },
        ],

      },
      { label: 'Open' },
      { label: 'Quit' }
      ]
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      items: [
        { label: 'Delete', icon: 'pi pi-fw pi-trash' },
        { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
      ]
    }, {
      label: '로그아웃',
      icon: 'pi pi-external-link',
      routerLink: ['/login'],
      command: () => {
        this.logout();
      }
    }
  ];

  constructor(
    private courseService: CoursesService,
    private lessonsEntityService: LessonsEntityService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.courseService.initAction();
    // this.lessonsEntityService.getAll();
  }

  logout() {
    this.store.dispatch(isAuth({ isAuth: false }));
    this.store.subscribe(data => {
      console.log('[LOGOUT]', data);
    })

  }



}
