import * as wss from './wss.js';

export const sendPreOffer = (callType,callePersonalCode) =>{
    console.log("send preoffer exuceted");
    console.log(callType);
    console.log(callePersonalCode); 

    const data = {
        callType,
        callePersonalCode,
    }

    wss.sendPreOffer(data);
}