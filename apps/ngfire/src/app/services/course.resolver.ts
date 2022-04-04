import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ICOURSE } from '../models/course.model';
import { CoursesService } from './courses.service';

@Injectable()
export class CourseResolver implements Resolve<ICOURSE> {
  constructor(private courseService: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ICOURSE | Observable<ICOURSE> | Promise<ICOURSE> {
    return this.courseService.getCourse(route.paramMap.get('id'));
  }
}
