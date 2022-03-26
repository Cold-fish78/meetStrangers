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
       console.log('about to show inncoming call handler')
        ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    }
}


const acceptCallHandler = () => {
    console.log('call accepted');
   sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
};
const rejectCallHandler = () => {
    console.log('call rejected');
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
}

const callingDialogRejectCallHandler =() =>{
    console.log('cut the call');
}




const sendPreOfferAnswer = (preOfferAnswer) =>{
const data = {
    callerSocketId : connectedUserDetails.socketId,
    preOfferAnswer,
}
console.log('at webrtc 64' + data);
ui.removeAllDialogs();
wss.sendPreOfferAnswer(data);
}



 export const handlePreOfferAnswer = (data) =>{
    const { preOfferAnswer} = data;
    console.log('preoffer answer came');
    console.log(data);
    ui.removeAllDialogs();
    
    if(preOfferAnswer ===constants.preOfferAnswer.CALLEE_NOT_FOUND){
        // show dialoge that callee has not been found

        ui.showInfoDialog(preOfferAnswer);
    }

    if(preOfferAnswer ===constants.preOfferAnswer.CALL_UNAVIALABLE){
        // show dialoge that callee is not able to connect
        
        ui.showInfoDialog(preOfferAnswer);
    }

    if(preOfferAnswer ===constants.preOfferAnswer.CALL_REJECTED){
        
        ui.showInfoDialog(preOfferAnswer);
        // show dialoge that call is rejected by the callee
    }

    if(preOfferAnswer ===constants.preOfferAnswer.CALL_ACCEPTED){
        // show dialoge that call has been accepted
        
        ui.showInfoDialog(preOfferAnswer);
    }
}