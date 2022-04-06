import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { PAGE } from '../../../model/course';
import { ICOURSE } from '../../../models/course.model';
import { ILESSON } from '../../../models/lesson.model';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  course: ICOURSE;
  lessons: ILESSON[] = [];
  loading = false;
  constructor(private route: ActivatedRoute, private courseService: CoursesService) {}
  lessonsPage: ILESSON[] = [];
  totalPage = 0;

  ngOnInit(): void {
    this.init();
  }

  init() {
    // this.loading = true;
    this.course = this.route.snapshot.data['course'];
    this.courseService
      .findLessons(this.course.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => {
        this.lessonsPage = data.sort((a, b) => {
          return a.seqNo - b.seqNo;
        });
        this.lessons = this.lessonsPage.slice(0, 3);
        this.totalPage = this.lessonsPage.length;
      });
  }

  paginate(event: PAGE) {
    console.log(event);
    // first: 3 Index of first record
    // page: 1   Index of the new page
    // pageCount: 4  Total number of pages
    // rows: 3  Number of rows to display in new page
    const start = event.page * event.rows;
    const end = start + event.rows;
    if (start > this.totalPage) {
      this.lessons = this.lessonsPage.slice(0, 3);
    }
    this.lessons = this.lessonsPage.slice(start, end);
  }
}
