import * as store from './store.js';
import * as ui from './ui.js';


let socketIO = null;

export const registerSocketEvents =(socket) => {
socket.on('connect',()=>{
    socketIO = socket;
    console.log('successfully connected to web socket server');
    console.log(socket.id);
    store.socketId(socket.id);
    ui.updatePersonalCode(socket.id);
});

}


export const sendPreOffer = (data) =>{
socketIO.emit('pre-offer',data);
}
