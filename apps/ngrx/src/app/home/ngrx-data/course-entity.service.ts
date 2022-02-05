import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { COURSE } from '../../models/courses.model';

@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<COURSE> {

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Course', serviceElementsFactory)
  }

}


