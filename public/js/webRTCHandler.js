import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js';
import * as store from './store.js';

let connectedUserDetails;
let peerConnection;

const defualtConstraints = {
    audio: true,
    video: true,
}

const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.1.google.com:13902'
        }
    ]
}

// getting user's camera and mic access

export const getLocalPreview = () => {
    navigator.mediaDevices.getUserMedia(defualtConstraints)
        .then((stream) => {
            ui.updateLocalVideo(stream);
            store.setLocalStream(stream);
        }).catch((err) => {
            console.log("error occured when trying to get access the camera at webrtc 18");
            console.log(err);
        })
}


export const createPeerConnection = () => {
    peerConnection = new RTCPeerConnection(configuration);
    peerConnection.onicecandidate = (event) => {
        console.log('getting ice condidates from stun server');
        if (event.condidate) {

        }
    }
    peerConnection.onconnectionstatechange = (event) => {
        if (peerConnection.state === 'connected') {
            console.log('successfully connected with other peer');
        }
    }

    const remoteStream = new MediaStream();
    store.setRemoteSteam(remoteStream);
    ui.updateRemoteVideo(remoteStream);
    peerConnection.ontrack = (event) => {
        remoteStream.addTrack(event.track);

    }

    if (connectedUserDetails.callType === constants.callType.VIDEO_CHAT_PERSONAL_CODE) {
        const localStream = store.getState().localStream;

        for (const track of localStream.getTracks()) {
            peerConnection.addTrack(track, localStream);
        }
    }
}

export const sendPreOffer = (callType, calleePersonalCode) => {
    // working till here
    connectedUserDetails = {
        callType,
        socketId: calleePersonalCode,
    }
    console.log(connectedUserDetails);

    if (callType === constants.callType.CHAT_PERSONAL_CODE || constants.callType.VIDEO_CHAT_PERSONAL_CODE) {
        const data = {
            callType,
            calleePersonalCode,
        }
        console.log("about to show calling dialogue");
        ui.showCallingDialog(callingDialogRejectCallHandler);
        wss.sendPreOffer(data);
    }


}
export const handlePreOffer = (data) => {
    console.log(data);

    const { callType, callerSocketId } = data;
    connectedUserDetails = {
        socketId: callerSocketId,
        callType,
    }

    if (callType === constants.callType.CHAT_PERSONAL_CODE || constants.callType.VIDEO_CHAT_PERSONAL_CODE) {
        console.log('about to show inncoming call handler')
        ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    }
}


const acceptCallHandler = () => {
    console.log('call accepted');
    createPeerConnection();
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
    ui.showCallElements(connectedUserDetails.callType);
};
const rejectCallHandler = () => {
    console.log('call rejected');
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
}

const callingDialogRejectCallHandler = () => {
    console.log('cut the call');
}




const sendPreOfferAnswer = (preOfferAnswer) => {
    const data = {
        callerSocketId: connectedUserDetails.socketId,
        preOfferAnswer,
    }
    console.log('at webrtc 64' + data);
    ui.removeAllDialogs();
    wss.sendPreOfferAnswer(data);
}



export const handlePreOfferAnswer = (data) => {
    const { preOfferAnswer } = data;
    console.log('preoffer answer came');
    console.log(data);
    ui.removeAllDialogs();

    if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
        // show dialoge that callee has not been found

        ui.showInfoDialog(preOfferAnswer);
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVIALABLE) {
        // show dialoge that callee is not able to connect

        ui.showInfoDialog(preOfferAnswer);
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {

        ui.showInfoDialog(preOfferAnswer);
        // show dialoge that call is rejected by the callee
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {
        // show dialoge that call has been accepted

        ui.showCallElements(connectedUserDetails.callType);
        createPeerConnection();
        sendWebRTCOffer();
    }
}


const sendWebRTCOffer =async () =>{
const offer = await peerConnection.createOffer();
await peerConnection.setLocalDescription(offer);
wss.sendDataUsingWebRTCSignalling({
    connetedUserSocketId : connectedUserDetails.socketId,
    type : constants.webRTCSignalling.OFFER,
    offer : offer,
})
}

export const handleWebRTCOffer = (data) =>{
   console.log('web rtc offer came');
   console.log(data);
}