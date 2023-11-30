const WebSocket = require('ws');

const server = new WebSocket.Server({ port: '8080' });
server.on('connection', socket => {
    console.log("User connected!");
    
    socket.on('message', message => {
        console.log(`User message was '${message.toString()}'`);
        socket.send(`${message} to you too!`);
    });
});
