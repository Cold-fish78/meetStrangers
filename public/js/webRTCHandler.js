import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js';

let connectedUserDetails;

export const sendPreOffer = (callType, calleePersonalCode) => {
    // working till here
  
    const data = {
        callType,
        calleePersonalCode,
    }

    wss.sendPreOffer(data);
}
export const handlePreOffer = (data) => {
    console.log(data);
  
    const { callType, callerSocketId } = data;
    connectedUserDetails = {
        socketId: callerSocketId,
        callType,
    }
   
    if (callType === constants.callType.CHAT_PERSONAL_CODE || constants.callType.VIDEO_CHAT_PERSONAL_CODE) {
       
        ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    }
}


const acceptCallHandler = () => {
    console.log('call accepted')
};
const rejectCallHandler = () => {
    console.log('call rejected');
}