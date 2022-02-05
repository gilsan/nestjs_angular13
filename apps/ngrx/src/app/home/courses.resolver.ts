import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { COURSE } from "../models/courses.model";
import { CoursesService } from "../services/courses.service";
import { CourseEntityService } from "./ngrx-data/course-entity.service";
import { CoursesDataService } from "./ngrx-data/courses-data.service";

@Injectable()
export class CoursesResolver implements Resolve<COURSE[]> {

  constructor(
    private courseEntityService: CourseEntityService
    // private coursesDataService: CoursesDataService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<COURSE[]> | Promise<COURSE[]> {

    return this.courseEntityService.getAll()
      .pipe(
        // tap(data => console.log('[resolver] ', data)),
        // map(courses => !!courses)
      );

  }

}
