import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ICOURSE } from '../models/course.model';
import { COURSES, LESSONS } from './db-data';

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
      const courseRef = await coursesCollection.add(newData);
      const lessons = (await courseRef).collection('lessons');
      const courseLessons = this.findLessonsForCourse(course['id']);
      for (let lesson of courseLessons) {
        const newLesson = { ...lesson };
        delete newLesson.courseId;
        await lessons.add(newLesson);
      }
      console.log('firebase 디비 만들기... END');
    }
  }

  removeId(course: ICOURSE) {
    const { id, ...newData } = course;
    return newData;
  }

  findLessonsForCourse(courseId: number) {
    return Object.values(LESSONS).filter((lesson) => lesson.courseId === courseId);
  }
}
