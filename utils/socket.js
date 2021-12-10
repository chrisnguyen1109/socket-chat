const io = require('socket.io')();
const { handleJoin, handleChat, handleDisconnect } = require('./handleSocket');

const handleEvent = socket => {
    console.log('New webSocket connection!');

    socket.on('join', handleJoin(io, socket));

    socket.on('chat message', handleChat(socket));

    socket.on('disconnect', handleDisconnect(io, socket));
};

const connect = app => {
    io.attach(app);
    io.on('connection', handleEvent);
};

module.exports = { connect };
