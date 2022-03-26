import * as constants from "./constants.js";
import * as elements from './elements.js';

export const updatePersonalCode = (personalCode) => {
    const personalCodeParagraph = document.getElementById('personal_code_paragraph');
    personalCodeParagraph.innerHTML = personalCode;
}


export const showIncomingCallDialog = (callType, acceptCallHandler, rejectCallHandler) => {

    const callTypeInfo = callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";

    // console.log('call type info' + callTypeInfo);
    const incomingCallDialog = elements.getIncomingCallDialog(callTypeInfo, acceptCallHandler, rejectCallHandler);
    const dialog = document.getElementById('dialog');
    dialog.querySelectorAll('*').forEach((dialog) =>dialog.remove());
    dialog.appendChild(incomingCallDialog); 
}


export const showCallingDialog =(rejectCallHandler) =>{
    const callingDialog = elements.getCallingDialog(rejectCallHandler);
    const dialog = document.getElementById('dialog');
    dialog.querySelectorAll('*').forEach((dialog) =>dialog.remove());
    dialog.appendChild(callingDialog); 
}

export const showInfoDialog = (preOfferAnswer) =>{
    let infoDialog = null;
    if(preOfferAnswer  ===constants.preOfferAnswer.CALL_REJECTED){
        infoDialog = elements.getInfoDialog(
            'Call rejected',
            'Calle rejected your call'
        );
    }

    if(preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND){
        infoDialog = elements.getInfoDialog(
            'Calle not found ',
            'Please check personal code'
        )
    }

    if(preOfferAnswer === constants.preOfferAnswer.CALL_UNAVIALABLE){
        console.log('call rejected but not visible');

        infoDialog = elements.getInfoDialog(
            'call is not possible',
            'Calle is busy. Please try again later'
        );
    }

    if(infoDialog){
        const dialog = document.getElementById('dialog');
        dialog.appendChild(infoDialog);

        setTimeout(()=>{
            removeAllDialogs();
        },[4000]);
    }

    // if(preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED){
    //     infoDialog = elements.getInfoDialog(
    //         'Call rejected',
    //         'Calle rejected your call'
    //     )
    // }
}

export const removeAllDialogs = () =>{
    const dialog = document.getElementById('dialog');
    dialog.querySelectorAll('*').forEach((dialog) =>dialog.remove());
}