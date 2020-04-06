//import express
const express = require('express');
let app = express();
let server = require("http").createServer(app);
// build a own server to allow accessing the Socket.io library
//create script in html to access this library
let io = require("socket.io")(server);
let port = process.env.PORT || 2000;

server.listen(port, function () {
    console.log(`server listening on localhost:${port}`);
});

let generateMessage = (text) => {
    return {
        text
    };
};
io.on("connection", function (client) {
    console.log('connected');
    client.on('createMessage', (msg, callback) => {
        console.log('createMessage', msg);
        // broadcast to everyone including sender
        io.emit('newMessage', generateMessage(msg.text));
        callback(`server send message: ${msg.text}`);
    });
    client.on('createLink', (data, callback) => {
        console.log('createLink', data);
        // broadcast to everyone including sender
        io.emit('newLink', {
            name: data.name,
            url:data.url,
            color: data.color
        });
        callback(`server send message: ${data.text}`);
    });

    client.on('cursorPos', (data) => {
        // console.log(data);
        client.broadcast.emit('draw_cursor', {
            mousePos: data.mousePos,
            id: client.id,
            color: data.color
        });
    });
});

app.use(express.static(__dirname + "/public"));
//https://expressjs.com/en/starter/static-files.html
app.get('/', function (req, res) {
    // console.log(`serving ${__dirname} /navigation.html`);
    res.sendFile(__dirname + "/navigation.html");
    res.sendFile(__dirname + "/isolation.html");
});