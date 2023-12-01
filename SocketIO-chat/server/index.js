const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: '*'}
});

let messageHistory = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    for (let message of messageHistory) {            
        socket.emit('message', message);
    }

    socket.on('message', (data) => {
        console.log('client sent:', data);
        const message = `${socket.id.substr(0, 2)} said ${data}`;
        messageHistory.push(message)
        io.emit('message', message);
    });

});

http.listen(8080, () => console.log('listening on http://localhost:8080'));