import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, withLatestFrom } from 'rxjs';
import { COURSE, LESSON } from '../../models/courses.model';
import { CourseEntityService } from '../ngrx-data/course-entity.service';
import { LessonsEntityService } from '../ngrx-data/lesssons-entity.service';

@Component({
  selector: 'ngshop-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  nextPage = 0;
  id: number;
  lessons: LESSON[] = [];
  course$: Observable<COURSE>;
  lesson$: Observable<LESSON[]>;
  constructor(
    private route: ActivatedRoute,
    private lessonsEntityService: LessonsEntityService,
    private courseEntityService: CourseEntityService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    const idx = this.route.snapshot.paramMap.get('id');
    this.course$ = this.courseEntityService.entities$.pipe(
      map(courses => courses.filter(course => course.id === parseInt(idx, 10))),
      map(course => course[0])
    );

    this.course$.subscribe(data => console.log('[33]', data))

    this.lessonsEntityService.entities$.pipe(
      withLatestFrom(this.course$),
      map(([lessons, courses]) =>
        lessons.filter(lesson => lesson.courseId === courses.id))
    ).subscribe(data => {

    });

    this.lessonsEntityService.getAll().subscribe(data => {
      this.lessonsEntityService.getWithQuery({ 'courseId': '5', 'page': '1', 'perPage': '3' })
        .subscribe(data => {
          this.lessons = data;
          this.store.subscribe(data => {
            console.log('[page] ', data);
          });
        });
    })





  }



}
