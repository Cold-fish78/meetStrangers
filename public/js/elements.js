export const getIncomingCallDialog = (callTypeInfo, acceptCallHandler, rejectCallHandler) => {
    console.log("getting incoming call dialogue");
    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper');
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('dialog_content');
    dialog.appendChild(dialogContent);
    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = `Incoming ${callTypeInfo} Call`;



    const imageContainer = document.createElement('div');
    imageContainer.classList.add('dialog_image_container');
    const image = document.createElement('img');
    const avatarImagePath = './utils/images/dialogAvatar.png';
    image.src = avatarImagePath;
    imageContainer.appendChild(image);


    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('dialog_button_container');

    //    accept button 
    const acceptCallButton = document.createElement('button');
    acceptCallButton.classList.add('dialog_accept_call_button');
    const acceptCallimg = document.createElement('img');
    acceptCallimg.classList.add('dialog_button_img');
    const acceptCallImagePath = './utils/images/acceptCall.png';
    acceptCallimg.src = acceptCallImagePath;
    acceptCallButton.append(acceptCallimg);
    buttonContainer.appendChild(acceptCallButton);

    // reject reject
    const rejectCallButton = document.createElement('button');
    rejectCallButton.classList.add('dialog_reject_call_button');
    const rejectCallimg = document.createElement('img');
    rejectCallimg.classList.add('dialog_button_img');
    const rejectCallImagePath = './utils/images/rejectCall.png';
    rejectCallimg.src = rejectCallImagePath;
    rejectCallButton.append(rejectCallimg);
    buttonContainer.appendChild(rejectCallButton);





    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainer);
    dialogContent.appendChild(buttonContainer);


    //  accepting the call

    acceptCallButton.addEventListener('click',()=>{
        acceptCallHandler();
    });

    rejectCallButton.addEventListener('click',()=>{
        rejectCallHandler();
    });

    return dialog;
}



export const getCallingDialog = (rejectCallHandler) => {


    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper');
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('dialog_content');
    dialog.appendChild(dialogContent);
    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = `Calling`;



    const imageContainer = document.createElement('div');
    imageContainer.classList.add('dialog_image_container');
    const image = document.createElement('img');
    const avatarImagePath = './utils/images/dialogAvatar.png';
    image.src = avatarImagePath;
    imageContainer.appendChild(image);



    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('dialog_button_container');

    const hangUpCallButton = document.createElement('button');
    hangUpCallButton.classList.add('dialog_reject_call_button');



    const hangUpCallimg = document.createElement('img');
    hangUpCallimg.classList.add('dialog_button_img');
    const rejectCallImagePath = './utils/images/rejectCall.png';
    hangUpCallimg.src = rejectCallImagePath;
    hangUpCallButton.append(hangUpCallimg);
    buttonContainer.appendChild(hangUpCallButton);



    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainer);
    dialogContent.appendChild(buttonContainer);
    return dialog;

}