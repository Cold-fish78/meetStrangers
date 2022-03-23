let state = {
    socketId : null,
    localStream : null,
    remoteStream : null,
    screenSharingActive : false,
    screenSharingStream : null,
    allowConnectionsFronStrangers : false,

}

export const socketId =(socketId) =>{
    state ={
        ...state,
        socketId,
    };
    console.log(state);
};

export const setLocalSteam = (stream) =>{
    state = {
        ...state,
        localStream : stream,

    }
}

export const setAllowConnectionsFromStrangers = (allowConnection) =>{
    state = {
        ...state,
        allowConnectionsFronStrangers : allowConnection,
    }
}


export const setScreenSharingActive = (screenSharingActive) =>{
    state = {
        ...state,
        screenSharingActive,
    }
}


export const setScreenSharingStream = (stream) =>{
    state = {
        ...state,
        screenSharingStream : stream,
    }
}

export const setRemoteSteam = (stream) =>{
    state = {
        ...state,
        remoteStream : stream,
    }
}

export const getState  = () =>{
    return state;
}