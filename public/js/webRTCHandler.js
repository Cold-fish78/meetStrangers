import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js';

let connectedUserDetails;

export const sendPreOffer = (callType, calleePersonalCode) => {
    // working till here
    connectedUserDetails={
        callType,
        socketId : calleePersonalCode,
    }
    console.log(connectedUserDetails);

    if(callType ===constants.callType.CHAT_PERSONAL_CODE || constants.callType.VIDEO_CHAT_PERSONAL_CODE){
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
       
        ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    }
}


const acceptCallHandler = () => {
    console.log('call accepted')
};
const rejectCallHandler = () => {
    console.log('call rejected');
}

const callingDialogRejectCallHandler =() =>{
    console.log('cut the call');
}