const exp = require('constants');
const express = require('express');
const http = require('http');
const PORT = process.env.PORT || 6002;


const app = express();
const server = http.createServer(app);
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + 'public/index.html');
});

server.listen(PORT, function (err) {
    if (err) {
        console.log('error occured while starting the server' + err);
    }
    console.log("server is running at port" + PORT);
});