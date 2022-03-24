import * as store from './store.js'
import * as wss from './wss.js'

const socket = io('/');

wss.registerSocketEvents(socket);



const personalCodeCopyButton = document.getElementById('personal_code_copy_button');
personalCodeCopyButton.addEventListener('click',()=>{
  const personalCode =  store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
})

// register event listeners for connection buttons

const personalCodeChatButton = document.getElementById('personal_code_chat_button');

const personalCodeVideoButton = document.getElementById('personal_code_video_button');


personalCodeChatButton.addEventListener('click',()=>{
    console.log("chat button clicked");
});


personalCodeVideoButton.addEventListener('click',()=>{
    console.log("video button clicked");
});