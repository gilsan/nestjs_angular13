import { Component, Input, OnInit } from '@angular/core';
import { ICOURSE } from '../../../models/course.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit {
  @Input() course: Partial<ICOURSE> = {
    description: '',
    url: '',
    longDescription: '',
    promo: false,
  };
  constructor() {}

  ngOnInit(): void {}
}
