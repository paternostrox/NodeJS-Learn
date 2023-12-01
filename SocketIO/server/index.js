const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: '*'}
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (data) => {
        console.log('client sent:', data);
        io.emit('message', `${socket.id.substr(0, 2)} said ${data}`);
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));