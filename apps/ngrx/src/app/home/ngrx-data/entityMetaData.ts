import { EntityMetadataMap } from "@ngrx/data";


export const entityMetaData: EntityMetadataMap = {
  Course: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
    }
  },
  Lessons: {}
}
