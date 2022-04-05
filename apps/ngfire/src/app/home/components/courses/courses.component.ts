import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
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
        this.lessons = data.sort((a, b) => {
          return a.seqNo - b.seqNo;
        });
      });
  }
}
