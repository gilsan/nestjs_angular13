import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, take, tap } from 'rxjs';
import { SocketioService } from '../../../socket-io.service';
import { MYINFO } from '../../models/rtc.model';
import { UserInfoService } from '../../store/userInfo.stroe';
import { SubSink } from 'subsink';

/***
 * https://padymies.medium.com/video-chats-with-angular-and-webrtc-3f892dd0acd6
 * https://developer.mozilla.org/ko/docs/Web/API/RTCPeerConnection/RTCPeerConnection
 * https://developer.mozilla.org/ko/docs/Web/API/Navigator
 * https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia
 * https://developer.mozilla.org/ko/docs/Web/API/RTCIceCandidate
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
 * https://webrtc.org/getting-started/firebase-rtc-codelab
 * https://github.com/padymies/angular-webrtc-sample
 * https://webrtc.github.io/samples/
 * offer ===>
 * ice-candidates  ====>
 * <=== answer
 * <==== ice-candicates
 *
 */
@Component({
  selector: 'webrtc-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit, OnDestroy {

  meetingID: string = null;
  userName: string = null;
  private subs = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socketService: SocketioService,
    private infoStore: UserInfoService
  ) { }


  myInfo: MYINFO = {
    id: '', myConnectionID: '', userName: '', meetingID: ''
  };

  peerConnectionID = [];
  peerConnection = [];

  iceConfiguration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302", },
      { urls: "stun:stun1.l.google.com:19302", },
    ]
  };

  connection: RTCPeerConnection;
  ngOnInit(): void {
    this.meetingID = this.route.snapshot.queryParamMap.get('meetingID');
    const type = this.route.snapshot.queryParamMap.get('type');
    this.userName = prompt('사용자명을 입력해 주세요. ');
    // console.log(this.meetingID, this.userName);
    if (!this.meetingID || !this.userName) {
      this.router.navigate(['/']);
      this.infoStore.setConnectionInfo(this.myInfo);
      return;
    } else {
      this.socketConnect(type);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


  socketConnect(type: string) {

    this.socketService.socket.on('userconnect', (data) => {
      if (data !== null || data !== undefined) {
        console.log('[76][userconnect]', data);
        const info = {
          id: data.id,
          myConnectionID: data.connectionID,
          userName: data.userName,
          meetingID: data.meetingID
        };
        this.myInfo = info;
        this.infoStore.setConnectionInfo(info);
      }
    })

    this.socketService.socket.on('inform-others-about-me', (data) => {
      console.log('[89][inform-others-about-me]', data);
      //  alert(data + ' 님이 입장 하였습니다.');
      this.setConnection(data.connectionID);
    });

    this.socketService.socket.on('inform_me_about_other_user', (data) => {
      console.log('[101][inform_me_about_other_user]', data);
    })

    this.socketService.socket.on('SDPProcess', (sdp) => {
      console.log('[105][SDPProcess]', sdp);
    });


    if (type === 'admin') {
      this.socketService.userConnect(this.meetingID, this.userName);
    } else if (type === 'join') {
      this.socketService.userConnect(this.meetingID, this.userName);
      // this.socketService.informOtherAboutMe(this.meetingID, this.userName);
    }
  }

  async setConnection(connID: string) {
    this.connection = new RTCPeerConnection(this.iceConfiguration);
    this.connection.onnegotiationneeded = async (event) => {  // function
      console.log('[120][onnegotiationneeded]', event)
      await this.setOffer(connID);
    };

    this.connection.onicecandidate = (event) => {   // event
      console.log('[126][onicecandidate]', event);
      if (event.candidate) {
        this.socketService.processSDP(JSON.stringify({ icecnadidate: event.candidate }), connID);
      }
    }

    this.connection.ontrack = (event) => {  // event
      console.log('[133][ontrack]', event);
    }

    this.peerConnectionID[connID] = connID;
    this.peerConnection[connID] = this.connection;


  }

  // private _registerConnectionListeners(connID: string) {
  //   this.connection.onnegotiationneeded = async (event) => {  // function
  //     await this.setOffer(connID);
  //   };

  //   this.connection.onicecandidate = (event) => {   // event
  //     console.log('148]', event);
  //     if (event.candidate) {
  //       this.socketService.processSDP(JSON.stringify({ icecnadidate: event.candidate }), connID);
  //     }
  //   }

  //   this.connection.ontrack = (event) => {  // event
  //     console.log(event);
  //   }

  //   this.peerConnectionID[connID] = connID;
  //   this.peerConnection[connID] = this.connection;
  // }

  async setOffer(connID: string) {
    // const connection = this.peerConnection[connID];
    const offer = await this.connection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    console.log('[165][offer]', offer);
    await this.connection.setLocalDescription(offer);
    this.socketService.processSDP(JSON.stringify({
      offer: this.connection.localDescription
    }), connID);
  }

  async setAnswer(connID: string) {

  }

  /****************************************** */




  /****************************************** */

  closeSession() {
    this.socketService.disconnect(this.myInfo.myConnectionID)
    this.router.navigate(['/home']);
  }

}
