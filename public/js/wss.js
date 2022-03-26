import * as store from './store.js';
import * as ui from './ui.js';
import * as webRTCHandler from './webRTCHandler.js';
let socketIO = null;

export const registerSocketEvents = (socket) => {
    socketIO = socket;
    socket.on('connect', () => {
        // console.log('successfully connected to web socket server');
        // console.log(socket.id);
        store.socketId(socket.id);
        ui.updatePersonalCode(socket.id);
    });
       

    socket.on('pre-offer' , (data)=>{
    //   working
        webRTCHandler.handlePreOffer(data);
    });

    // caller side event 
    socket.on('pre-offer-answer',(data)=>{
        webRTCHandler.handlePreOfferAnswer(data);
    });

}


export const sendPreOffer = (data) => {
    console.log('inside send pre offer function');
    console.log(data);
    socketIO.emit("pre-offer", data);
}

// callee side
export const sendPreOfferAnswer = (data) =>{
    console.log("inside send pre offer answer @wss37" + data);
    socketIO.emit('pre-offer-answer',data);
}