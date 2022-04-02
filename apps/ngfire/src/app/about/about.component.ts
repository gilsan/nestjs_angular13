import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ICOURSE } from '../models/course.model';
import { COURSES, findLessonsForCourse } from './db-data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {}

  async uploadData() {
    const coursesCollection = this.db.collection('courses');
    const courses = await this.db.collection('courses').get();
    for (let course of Object.values(COURSES)) {
      const newData = this.removeId(course as ICOURSE);
      console.log(newData);
    }
  }

  removeId(course: ICOURSE) {
    const { id, ...newData } = course;
    return newData;
  }
}
