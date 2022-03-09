
export interface IState {
  socketId: string;
  localStream: MediaStream;
  remoteStream: MediaStream;
  screenSharingStream: string;
  allowConnectionsFromStrangers: boolean;
  screenSharingActive: boolean;
}

export const callType = {
  CHAT_PERSONAL_CODE: 'CHAT_PERSONAL_CODE',
  CHAT_STRANGER: 'CHAT_STRANGER',
  VIDEO_PERSONAL_CODE: 'VIDEO_PERSONAL_CODE',
  VIDEO_STRANGER: 'VIDEO_STRANGER'
}

export const preOfferAnswer = {
  CALLEE_NOT_FOUND: "CALLEE_NOT_FOUND",
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_UNAVAILABLE: 'CALL_UNAVAILABLE'
}

export interface ICallType {
  callType: string;
  calleePersonalCode: string;
}
export interface ICALLINFO {
  callType: string;
  calleeSocketID: string;
  callerSocketID: string;
}



export interface IPreOfferAnswer {
  callerSocketId: string;
  preOfferAnswer: string;
}

export interface IPREOFFERANANSWER {
  callerSocketID: string;
  calleeSocketID: string;
  preOfferAnswer: string;
}

export const webRTCSignaling = {
  OFFER: 'OFFER',
  ANSWER: 'ANSWER',
  ICE_CANDIDATE: 'ICE_CANDIDATE'
};

export interface IOffer {
  offer: { sdp: string, type: string }
}


export interface WINDOW {
  RTCPeerConnection: RTCPeerConnection;
  mozRTCPeerConnection: RTCPeerConnection;
  webkitRTCPeerConnection: RTCPeerConnection;
  RTCSessionDescription: RTCSessionDescription;
  mozRTCSessionDescription: RTCSessionDescription;
  webkitRTCSessionDescription: RTCSessionDescription;
  RTCIceCandidate: RTCIceCandidate;
  mozRTCIceCandidate: RTCIceCandidate;
  webkitRTCIceCandidate: RTCIceCandidate;
}
