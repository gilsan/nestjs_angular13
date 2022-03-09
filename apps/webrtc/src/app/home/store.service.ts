
import { Injectable } from '@angular/core';
import { IState } from './model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  state: IState = {
    socketId: null,
    localStream: null,
    remoteStream: null,
    screenSharingActive: false,
    screenSharingStream: null,
    allowConnectionsFromStrangers: false,
  }

  setSocketId(socketId: string) {
    this.state = { ...this.state, socketId };
  }

  setLocalStream(stream: MediaStream) {
    this.state = { ...this.state, localStream: stream }
  }

  setAllowConnectionsFromStrangers(allowConnection: boolean) {
    this.state = { ...this.state, allowConnectionsFromStrangers: allowConnection };
  }

  setScreenSharingActive(stream: boolean) {
    this.state = { ...this.state, screenSharingActive: stream };
  }

  setRemoteStream(stream: MediaStream) {
    this.state = { ...this.state, remoteStream: stream };
  }

  getState(): IState {
    return this.state;
  }










}
