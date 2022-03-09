import { Injectable } from "@angular/core";
import { MYINFO } from "../models/rtc.model";


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  connectionInfo: MYINFO;

  setConnectionInfo(info: MYINFO): void {
    this.connectionInfo = info;

  }

  getConnectionInfo(): MYINFO {
    return this.connectionInfo;
  }



}
