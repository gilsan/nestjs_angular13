import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { COURSE } from '../../models/courses.model';
import { CourseEntityService } from '../ngrx-data/course-entity.service';

@Component({
  selector: 'courses-card-list',
  templateUrl: './coures-card-list.component.html',
  styleUrls: ['./coures-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CouresCardListComponent implements OnInit {

  @Input() courses: COURSE[];
  course: COURSE = {
    id: 0,
    description: '',
    longDescription: '',
    iconUrl: '',
    category: '',
    seqNo: '',
    url: '',
  }
  displayModal = false;
  index: number;
  category = [
    { name: '초급', code: 'BGEINNER' },
    { name: '고급', code: 'ADVANCED' },
  ];
  selectedCategory: string;
  checked = false;
  constructor(
    private store: Store,
    private entityService: CourseEntityService
  ) { }

  ngOnInit(): void {
    console.log('[card lists]', this.courses);
  }

  edit(course: COURSE, i: number): void {
    console.log(this.courses[i]);
    this.index = i;
    this.course = { ...course };
    this.displayModal = true;
  }

  view(): void {

  }

  delete(i: number): void {
    console.log(i);
  }

  save() {
    this.course.category = 'BEGINNER';
    this.entityService.update(this.course);
    this.displayModal = false;
  }

  cancel() {
    this.displayModal = false;
  }



}
