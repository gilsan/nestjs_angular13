import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { MYINFO } from "../models/rtc.model";


@Injectable()
export class SocketEntity extends EntityCollectionServiceBase<MYINFO> {

  constructor(
    serviceElementsService: EntityCollectionServiceElementsFactory
  ) {
    super('Socket', serviceElementsService);
  }

}
