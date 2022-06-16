import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ICOURSE } from '../../models/course.model';


import { CourseService } from './course.service';


@Injectable()
export class CourseResolver implements Resolve<ICOURSE> {
  constructor(private courseService: CourseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ICOURSE | Observable<ICOURSE> | Promise<ICOURSE> {
    return this.courseService.getCourse(route.paramMap.get('id'));
  }
}
