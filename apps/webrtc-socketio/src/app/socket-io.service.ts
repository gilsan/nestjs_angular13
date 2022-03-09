import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket = io('http://localhost:3000');
  public userconnect$: BehaviorSubject<any> = new BehaviorSubject('');
  public userConnect$ = this.userconnect$.asObservable();

  public userinfo$: BehaviorSubject<any> = new BehaviorSubject('');
  public userInfo$ = this.userinfo$.asObservable();


  public informotherAboutMe$: BehaviorSubject<any> = new BehaviorSubject('');
  public informOtherAboutMe$ = this.informotherAboutMe$.asObservable();



  constructor() {
    this.onDisconnect();
  }

  public onDisconnect() {
    this.socket.on('disconnet', () => {
      this.socket = this.socket.connect();
    })
  }

  public reConnect() {
    if (this.socket.disconnected) {
      this.socket = this.socket.connect();
    }
  }


  public userConnect(meetingID: string, userName: string) {
    this.socket.emit('userconnect', { meetingID, userName });
  }

  public disconnect(connectionID: string) {
    this.socket.close();
  }

  public informOtherAboutMe(meetingID: string, userName: string) {
    this.socket.emit('inform-others-about-me', { meetingID, userName });
  }


  public processSDP(data: string, toConnid: string) {
    console.log('[57][processSDP]', data, toConnid);
    this.socket.emit('SDPProcess', {
      message: data,
      toConnID: toConnid
    });
  }









}
