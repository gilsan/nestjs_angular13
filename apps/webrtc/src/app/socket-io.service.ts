import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { ICALLINFO, ICallType, IPREOFFERANANSWER, IPreOfferAnswer } from "./home/model";


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket = io('http://localhost:3000');

  constructor() { }

  sendPreOffer2(data: ICallType) {
    this.socket.emit('pre-offer', data);
  }

  sendPreOffer(data: ICALLINFO) {
    this.socket.emit('pre-offer', data);
  }

  sendPreOfferAnswer(preOfferAnswer: IPreOfferAnswer) {
    this.socket.emit('pre-offer-answer', preOfferAnswer);
  }

  sendPreOfferANSWER(preOfferAnswer: IPREOFFERANANSWER) {
    // console.log('[sendPreOfferANSWER]', preOfferAnswer)
    this.socket.emit('pre-offer-answer', preOfferAnswer);
  }

  sendDataUsingWebRTCSignaling(data: { connectedUserSocketId: string, type: string, offer: any }) {
    // console.log('[webRTC-Signaling][OFFER]', data);
    this.socket.emit('webRTC-Signaling', data);
  }

  sendDataUsingWebRTCSignalingAnswer(data: { connectedUserSocketId: string, type: string, answer: any }) {
    // console.log('[webRTC-Signaling][ANSWER]', data);
    this.socket.emit('webRTC-Signaling', data);
  }

  sendDataUsingWebRTCSignalingCandidate(data: { connectedUserSocketId: string, type: string, candidate: RTCIceCandidate }) {
    // console.log('[webRTC-Signaling][candidate]', data);
    this.socket.emit('webRTC-Signaling', data);
  }






}
