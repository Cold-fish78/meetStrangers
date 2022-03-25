const exp = require('constants');
const express = require('express');
const req = require('express/lib/request');
const http = require('http');
const { Socket } = require('socket.io');
const PORT = process.env.PORT || 6002;


const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
});

let connectedPeers = [];

io.on('connection', (socket) => {
    connectedPeers.push(socket.id);
    // console.log(connectedPeers);

    socket.on('pre-offer', (data) => {
        console.log(data);
        let {callType,calleePersonalCode} = data;
    //    working till here
        const connectedPeer = connectedPeers.find(
            (peerSocketId) =>peerSocketId === calleePersonalCode
        );
        console.log(connectedPeer);
        if (connectedPeer) {
            const data = {
                callerSocketId: socket.id,
                callType,
            }
        //    console.log("this is connected peer" + connectedPeer);
            io.to(calleePersonalCode).emit('pre-offer', data);
        }

    });
    socket.on('disconnect', () => {
        // console.log('user disconnected');
        newConnectecPeers = connectedPeers.filter((peerSocketId) =>
            peerSocketId !== socket.id
        );
        connectedPeers = newConnectecPeers;
        console.log("connected peers are" +connectedPeers);

    });
});

server.listen(PORT, function (err) {
    if (err) {
        console.log('error occured while starting the server' + err);
    }
    console.log("server is running at port" + PORT);
});