import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { COURSES } from './datas';
import { COURSE } from '../../models/courses.model';
import { BehaviorSubject, filter, from, map, noop, Observable, of, shareReplay, take, takeLast, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCourses, loggedIn } from '../state/courses.selectors';
import { loadCoursesSuccess } from '../state/courses.actions';
import { ActivatedRoute } from '@angular/router';
import { CourseEntityService } from '../ngrx-data/course-entity.service';



@Component({
  selector: 'ngrx-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: COURSE[] = [];
  beginner$: Observable<COURSE[]>;
  advanced$: Observable<COURSE[]>;

  constructor(
    private courseService: CoursesService,
    private store: Store,
    private route: ActivatedRoute,
    private entityService: CourseEntityService
  ) { }

  ngOnInit(): void {
    this.getCourses();
    this.store.subscribe(data => {
      console.log('[courses store]', data);
    });

    const courseData = this.route.snapshot.data;
  }

  getCourses() {

    // courses$.subscribe(data => {
    //   console.log('[courses entity]', data);
    // })
    // const courses$ = this.entityService.getAll();
    // const courses$ = this.store.select(getCourses)
    // const courses$ = this.courseService.getLists();

    this.advanced$ = this.entityService.entities$.pipe(
      map(lists => lists.filter(list => list.category === 'ADVANCED'))
    );

    this.beginner$ = this.entityService.entities$.pipe(
      map(lists => lists.filter(list => list.category === 'BEGINNER'))
    );




  }

  loadCourses() {
    const tempCourses: COURSE[] = Object.values(COURSES);

    tempCourses.forEach(course => {
      this.courseService.insertCourse(course)
        .subscribe(data => {
          console.log(data);
        })
    });
  }

}
