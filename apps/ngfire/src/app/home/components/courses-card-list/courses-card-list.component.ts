import { Component, Input, OnInit } from '@angular/core';
import { ICOURSE } from '../../../models/course.model';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss'],
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: ICOURSE[] = [];
  constructor() {}

  ngOnInit(): void {
    console.log(this.courses);
  }

  viewContent() {
    console.log('view...');
  }

  editCourse(course: ICOURSE) {
    console.log('Edit...', course);
  }
}
