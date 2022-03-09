import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketioService } from '../../socket-io.service';
import { StoreService } from '../store.service';
import {
  callType as constants, ICALLINFO, ICallType, IOffer, preOfferAnswer as preofferanswer,
  webRTCSignaling as webRTCSignaling,
  WINDOW
} from '../model';


/***********
 * https://webrtc.org/getting-started/peer-connections
 */
@Component({
  selector: 'app-videochat',
  templateUrl: './videochat.component.html',
  styleUrls: ['./videochat.component.scss']
})
export class VideochatComponent implements OnInit {


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

  personalCode = '';
  // connectedUserDetails: { callType: string, socketId: string } = { callType: null, socketId: null };
  connectedUserDetails: { callType: string, socketID: string } = { callType: null, socketID: null };
  callTitle = '';

  defaultConstraints = {
    audio: false,
    video: true
  };

  @ViewChild('personalcode', { static: true }) personalcode: ElementRef;
  @ViewChild('localVideo', { static: true }) localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo', { static: true }) remoteVideo: ElementRef<HTMLVideoElement>;
  constructor(
    private service: SocketioService,
    private store: StoreService

  ) { }

  // myInfo: { myConnectionID: string, id: string, meetingID: string, userName: string, calleeID: string };
  // callType: ICallType;
  myInfo: { mySocketID: string, calleeSocketID: string };
  callType: ICALLINFO = { callType: '', calleeSocketID: '', callerSocketID: '' };
  typeCall = '';


  ngOnInit(): void {
    this.initLoad();
    this.initListen();
  }

  initListen() {
    this.service.socket.on('connect', () => {
      this.personalCode = this.service.socket.id;
      // const info = {
      //   myConnectionID: this.personalCode,
      //   calleeID: '',
      //   id: '',
      //   userName: '',
      //   meetingID: ''
      // }
      const info = {
        mySocketID: this.personalCode, calleeSocketID: ''
      }
      this.myInfo = info;
      // console.log(this.myInfo);
      this.store.setSocketId(this.personalCode);
    });

    // 수진자 받음
    this.service.socket.on('pre-offer', (data) => {
      // const { callerSocketId, callType } = data;
      // this.connectedUserDetails = {
      //   socketId: callerSocketId,
      //   callType
      // };
      const { callType, calleeSocketID, callerSocketID } = data;
      this.connectedUserDetails = {
        socketID: callerSocketID,
        callType
      };
      this.myInfo.calleeSocketID = callerSocketID;
      // console.log('[pre-offer][90][수신자]', this.connectedUserDetails);
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

    // 발신자 받음
    this.service.socket.on('pre-offer-answer', (data) => {
      // console.log('[pre-offer-answer][103][발신자]', data, this.myInfo);
      // const { callerSocketId, preOfferAnswer } = data;
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

        // console.log('[104]', this.callType.callType);
        if (this.callType.callType === constants.CHAT_PERSONAL_CODE) {
          this.chatDom = true;
          this.messageDom = true;
          this.dashboard_blur = true;
        }

        if (this.callType.callType === constants.VIDEO_PERSONAL_CODE) {
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
      console.log('[161][webRTC-Signaling]', data);
      const type = data.type;
      if (type === webRTCSignaling.OFFER) {
        this.handleWebRTCOffer(data);
      } else if (type === webRTCSignaling.ANSWER) {
        this.handleWebRTCAnswer(data);
      } else if (type === webRTCSignaling.ICE_CANDIDATE) {
        console.log('[ICE CANDIDATE]');
        this.handleWebRTCCandidate(data);
      }
    })


  }

  initLoad() {
    this.createPeerConnection();
    // this.getLocalPreview();

  }

  getLocalPreview() {
    navigator.mediaDevices.getUserMedia(this.defaultConstraints)
      .then((stream) => {
        this.localVideo.nativeElement.srcObject = stream;
        this.store.setLocalStream(stream);
      })
      .catch((err) => console.log('[stream error)', err))
  }

  createPeerConnection() {
    const stream = navigator.mediaDevices.getUserMedia(this.defaultConstraints);
    this.connection = new RTCPeerConnection(this.iceConfiguration);

    this.connection.onicecandidate = (ev: RTCPeerConnectionIceEvent) => {
      console.log('[200]')
    }

    this.connection.onicecandidate = (event) => {
      console.log("[geeting ice candidates from stun server][198]", event);
      if (event.candidate) {
        console.log('[192]');
        // send our ice candiates to other peer
        this.service.sendDataUsingWebRTCSignalingCandidate({
          connectedUserSocketId: this.connectedUserDetails.socketID,
          type: webRTCSignaling.ICE_CANDIDATE,
          candidate: event.candidate
        })
      }
    }
    // this.connection.onicecandidate = this.handleICECandidateEvent;

    this.connection.onconnectionstatechange = (event) => {
      console.log('[207]');
      if (this.connection.connectionState === 'connected') {
        console.log('Succefully connected with other peer');
      }
    }

    // receiving tracks
    // const remoteStream = new MediaStream();
    // this.remoteVideo.nativeElement.srcObject = remoteStream;

    this.connection.ontrack = (event) => {
      console.log('[ontrack]', event);
      this.remoteVideo.nativeElement.srcObject = event.streams[0];
      // remoteStream.addTrack(event.track);
    }

    // add our stream to peer connection
    if (this.typeCall === 'VIDEO_PERSONAL_CODE') {

      stream.then((localstream) => {
        // this.localVideo.nativeElement.srcObject = localstream;
        localstream.getTracks().forEach(track => {
          this.connection.addTrack(track, localstream);
        })

      });
      // const localstream = this.store.getState().localStream;
      // for (const track of localstream.getTracks()) {
      //   this.connection.addTrack(track, localstream);
      // }
    }
  }



  async sendWebRTCOffer(callee: string) {
    const offer = await this.connection.createOffer();
    await this.connection.setLocalDescription(offer);
    // console.log('[webRTC-Signaling][251]', this.connectedUserDetails)
    this.service.sendDataUsingWebRTCSignaling({
      connectedUserSocketId: callee,
      type: webRTCSignaling.OFFER,
      offer
    });


  }

  personalCodeCopy() {
    //  this.personalcode.nativeElement.value = this.personalCode;
  }

  personalCodeChat(calleeSocketID: string) {
    const callType = constants.CHAT_PERSONAL_CODE;
    // this.callType = { callType, calleePersonalCode: calleeID };
    this.callType = { callType, callerSocketID: this.myInfo.mySocketID, calleeSocketID: this.personalcode.nativeElement.value };
    this.service.sendPreOffer(this.callType);
    this.myInfo.calleeSocketID = calleeSocketID;
    // this.myInfo.calleeID = calleeID;



  }

  // 발신자
  personalCodeVideoCall(calleeID: string) {
    const callType = constants.VIDEO_PERSONAL_CODE;
    // this.callType = { callType, calleePersonalCode: calleeID };
    this.callType = { callType, callerSocketID: this.myInfo.mySocketID, calleeSocketID: this.personalcode.nativeElement.value };
    this.service.sendPreOffer(this.callType);
    this.callerDialog = true;
    this.myInfo.calleeSocketID = calleeID;
  }



  connectingChat() { }

  connectingVideoCall() { }

  calleeAccepted() {
    this.dialogShow = false;
    // const data = {
    //   callerSocketId: this.connectedUserDetails.socketID,
    //   preOfferAnswer: preofferanswer.CALL_ACCEPTED
    // };
    const data = {
      callerSocketID: this.myInfo.mySocketID,
      calleeSocketID: this.connectedUserDetails.socketID,
      preOfferAnswer: preofferanswer.CALL_ACCEPTED
    };
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


    this.sendWebRTCOffer(this.myInfo.calleeSocketID);
  }

  calleeRejected() {
    this.dialogShow = false;
    const data = {
      callerSocketID: this.myInfo.mySocketID,
      calleeSocketID: this.connectedUserDetails.socketID,
      preOfferAnswer: preofferanswer.CALL_ACCEPTED
    };

    this.service.sendPreOfferANSWER(data);
  }

  callerRejected() {
    this.callerDialog = false;
  }

  async handleWebRTCOffer(data) {
    this.connection.setRemoteDescription(data.offer);
    const answer = await this.connection.createAnswer();
    await this.connection.setLocalDescription(answer);
    this.service.sendDataUsingWebRTCSignalingAnswer({
      connectedUserSocketId: this.connectedUserDetails.socketID,
      type: webRTCSignaling.ANSWER,
      answer
    });

  }

  async handleWebRTCAnswer(data) {

    await this.connection.setRemoteDescription(data.answer);
  }

  async handleWebRTCCandidate(data) {
    try {
      await this.connection.addIceCandidate(data.candidate);
    } catch (err) {
      console.log(err);
    }
  }

  /* ########################  EVENT HANDLER  ################################## */
  private handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    console.log('[349] ', event);
    if (event.candidate) {
      this.service.sendDataUsingWebRTCSignalingCandidate({
        connectedUserSocketId: this.connectedUserDetails.socketID,
        type: webRTCSignaling.ICE_CANDIDATE,
        candidate: event.candidate
      })
    }
  }



}
