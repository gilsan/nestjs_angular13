import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketioService } from '../../socket-io.service';
import { StoreService } from '../store.service';
import {
  callType as constants, ICALLINFO, ICallType, IOffer, preOfferAnswer as preofferanswer,
  webRTCSignaling as webRTCSignaling,
  WINDOW
} from '../model';
import adapter from 'webrtc-adapter';


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
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  localVideoActive = false;
  inCall = false;
  userName: string = '';
  dialogShow = false;
  callerDialog = false;
  callerTitle = '연결중...';
  errorDialog = false;
  errorTitle = '연결하지 못했습니다.';
  errorDescription = '';

  chatDom = false;
  videoDom = false;
  messageDom = false;
  dashboard_blur = false;
  videoPlaceholder = true;

  iceConfiguration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302", },
      { urls: "stun:stun1.l.google.com:19302", },
    ]
  };

  configuration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  connection: RTCPeerConnection;
  peerConnection: RTCPeerConnection;
  personalCode = '';
  connectedUserDetails: { callType: string, socketID: string } = { callType: null, socketID: null };
  callTitle = '';

  defaultConstraints = {
    audio: false,
    video: true
  };

  myInfo: { mySocketID: string, calleeSocketID: string };
  callType: ICALLINFO = { callType: '', calleeSocketID: '', callerSocketID: '' };
  typeCall = '';

  @ViewChild('calleeSocketID', { static: true }) calleeSocketid: ElementRef;
  @ViewChild('localVideo', { static: true }) localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo', { static: true }) remoteVideo: ElementRef<HTMLVideoElement>;

  constructor(
    private service: SocketioService,
    private store: StoreService

  ) { }




  ngOnInit(): void {
    console.log('Adapter : ', adapter);
    this.initListen();
  }

  initListen() {
    /**
     * 내 socket id 가져오기
     */
    this.service.socket.on('connect', () => {
      this.personalCode = this.service.socket.id;
      const info = {
        mySocketID: this.personalCode,
        calleeSocketID: '',
      }
      this.myInfo = info;

      this.store.setSocketId(this.personalCode);
    });

    this.peerConnection = new RTCPeerConnection({
      "iceServers": [
        {
          "urls": "stun:stun.l.google.com:19302"
        },
      ]
    });

    this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        this.service.sendDataUsingWebRTCSignalingCandidate({
          connectedUserSocketId: this.myInfo.calleeSocketID,
          type: webRTCSignaling.ICE_CANDIDATE,
          candidate: event.candidate
        });
      }
    };

    this.peerConnection.onconnectionstatechange = (event) => {
      if (this.peerConnection.connectionState === 'connected') {
        console.log('Succefully connected with other peer');
      }
    }

    // // receiving tracks
    // const remoteStream = new MediaStream();
    // this.remoteVideo.nativeElement.srcObject = remoteStream;
    // ui.updateRemoteVideo(remoteStream);

    this.peerConnection.ontrack = (event) => {
      console.log('[ontrack]===>', event);
      this.remoteVideo.nativeElement.srcObject = event.streams[0];
      this.remoteVideo.nativeElement.play();
      // remoteStream.addTrack(event.track);
    }

    // 수신자 용: 발신자 ==> 수신자
    this.service.socket.on('pre-offer', (data) => {
      const { callType, calleeSocketID, callerSocketID } = data;
      this.connectedUserDetails = {
        socketID: callerSocketID,
        callType
      };
      this.myInfo.calleeSocketID = callerSocketID;
      this.typeCall = callType;
      if (callType === constants.CHAT_PERSONAL_CODE || callType === constants.VIDEO_PERSONAL_CODE) {
        this.dialogShow = true;
      }
      if (callType === constants.CHAT_PERSONAL_CODE || callType === constants.CHAT_STRANGER) {
        this.callTitle = 'CHAT';
      } else if (callType === constants.VIDEO_PERSONAL_CODE || callType === constants.VIDEO_STRANGER) {
        this.callTitle = 'VIDEO';
      }
    });


    // 발신자 용 : 수신자 ===> 발신자
    // offer 수신후 answer 발송
    this.service.socket.on('pre-offer-answer', (data) => {
      const { callerSocketID, calleeSocketID, preOfferAnswer } = data;
      if (preOfferAnswer === 'CALL_REJECTED') {
        this.callerDialog = false;
        this.errorDialog = true;
        this.errorDescription = '연결이 거절 되었습니다.';
      } else if (preOfferAnswer === 'CALL_UNAVAILABLE') {
        this.callerDialog = false;
        this.errorDialog = true;
        this.errorDescription = '다음에 다시 이용 주십시요.';
      } else if (preOfferAnswer === 'CALLEE_NOT_FOUND') {
        this.callerDialog = false;
        this.errorDialog = true;
        this.errorDescription = '사용자가 맞는지 다시 확인해 주십시요';
      } else if (preOfferAnswer === 'CALL_ACCEPTED') {
        this.callerDialog = false;

        if (this.typeCall === constants.CHAT_PERSONAL_CODE) {
          this.chatDom = true;
          this.messageDom = true;
          this.dashboard_blur = true;
        }

        if (this.typeCall === constants.VIDEO_PERSONAL_CODE) {
          this.videoDom = true;
          this.messageDom = true;
          this.dashboard_blur = true;
          this.videoPlaceholder = false;
        }
        this.sendWebRTCOffer(callerSocketID);
      }

      setTimeout(() => {
        this.errorDialog = false;
      }, 5000);
    });

    // 수신자받음
    this.service.socket.on('webRTC-Signaling', (data) => {
      // console.log('[186][webRTC-Signaling]', data);
      const type = data.type;
      if (type === webRTCSignaling.OFFER) {
        this.handleWebRTCOffer(data);
      } else if (type === webRTCSignaling.ANSWER) {
        this.handleWebRTCAnswer(data);
      } else if (type === webRTCSignaling.ICE_CANDIDATE) {
        this.handleWebRTCCandidate(data);
      }
    });

  }

  showcamera() {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then((stream) => {
      this.localVideo.nativeElement.srcObject = stream;
    });
  }

  // 발신자 ===> 수신자에게  offer 보냄.
  async sendWebRTCOffer(callee: string) {
    const offer = await this.peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });

    await this.peerConnection.setLocalDescription(offer);
    this.service.sendDataUsingWebRTCSignaling({
      connectedUserSocketId: callee,
      type: webRTCSignaling.OFFER,
      offer
    });
  }

  // 수신자 ===> 발신자에게 answer 보냄
  async handleWebRTCOffer(data) {
    this.peerConnection.setRemoteDescription(data.offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    this.service.sendDataUsingWebRTCSignalingAnswer({
      connectedUserSocketId: this.myInfo.calleeSocketID,
      type: webRTCSignaling.ANSWER,
      answer
    });
  }

  async handleWebRTCAnswer(data) {
    await this.peerConnection.setRemoteDescription(data.answer);
    this.showcamera();
  }

  async handleWebRTCCandidate(data) {
    try {
      await this.peerConnection.addIceCandidate(data.candidate);
      this.showcamera();
    } catch (err) {
      console.log(err);
    }
  }




  personalCodeCopy() { }

  // 발신자 => 수신자에게 채팅연결 요청
  personalCodeChat(calleeSocketID: string) {
    const callType = constants.CHAT_PERSONAL_CODE;
    this.callType = { callType, callerSocketID: this.myInfo.mySocketID, calleeSocketID: this.calleeSocketid.nativeElement.value };
    this.service.sendPreOffer(this.callType);
    this.myInfo.calleeSocketID = calleeSocketID;
  }

  // 발신자 => 수신자에게 화상연결 요청
  personalCodeVideoCall(calleeSocketID: string) {
    const callType = constants.VIDEO_PERSONAL_CODE;
    this.callType = { callType, callerSocketID: this.myInfo.mySocketID, calleeSocketID: this.calleeSocketid.nativeElement.value };
    this.service.sendPreOffer(this.callType);
    this.callerDialog = true;
    this.myInfo.calleeSocketID = calleeSocketID;
  }

  // 수신자 => 발신자에게 수락,거절 응답
  // answer 응답
  calleeAccepted() {
    this.dialogShow = false;
    const data = {
      callerSocketID: this.myInfo.mySocketID,
      calleeSocketID: this.connectedUserDetails.socketID,
      preOfferAnswer: preofferanswer.CALL_ACCEPTED
    };
    // console.log('[calleeAccepted]', data);
    this.service.sendPreOfferANSWER(data);

    if (this.typeCall === constants.CHAT_PERSONAL_CODE) {
      this.chatDom = true;
      this.messageDom = true;
      this.dashboard_blur = true;
    } else if (this.typeCall === constants.VIDEO_PERSONAL_CODE) {
      this.videoDom = true;
      this.messageDom = true;
      this.dashboard_blur = true;
      this.videoPlaceholder = false;
    }
    //this.sendWebRTCOffer(this.myInfo.calleeSocketID);

  }
  // 거절
  calleeRejected() {
    const data = {
      callerSocketID: this.myInfo.mySocketID,
      calleeSocketID: this.connectedUserDetails.socketID,
      preOfferAnswer: preofferanswer.CALL_ACCEPTED
    };
  }


  connectingChat() { }
  connectingVideoCall() { }

}
