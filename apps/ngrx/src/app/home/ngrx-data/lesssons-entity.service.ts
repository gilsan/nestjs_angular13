import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { LESSON } from "../../models/courses.model";

@Injectable()
export class LessonsEntityService extends EntityCollectionServiceBase<LESSON> {

  constructor(
    lessonsElementaryFactory: EntityCollectionServiceElementsFactory
  ) {
    super('Lessons', lessonsElementaryFactory)
  }

}
