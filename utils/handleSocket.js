const Filter = require('bad-words');
const { addUser, getUser, removeUser, getUsersRoom } = require('./users');

module.exports = {
    handleJoin(io, socket) {
        return (data, callback) => {
            if (!addUser({ id: socket.id, ...data })) return callback('This user is in use!');

            socket.join(data.room);
            socket.emit('connected', 'Welcome!');
            socket.broadcast.to(data.room).emit('connected', `"${data.user}" has joined!`);
            io.to(data.room).emit('list users', getUsersRoom(data.room));
            callback();
        };
    },

    handleChat(socket) {
        return (msg, callback) => {
            const user = getUser(socket.id);

            const filter = new Filter();
            if (filter.isProfane(msg)) {
                return callback({
                    msg: filter.clean(msg),
                    res: 'This message could not be sent because it contains profanity!',
                    user: user.user,
                });
            }

            socket.broadcast.to(user.room).emit('chat message', { msg, user: user.user });
            callback({ msg, res: 'Sent', user: user.user });
        };
    },

    handleDisconnect(io, socket) {
        return () => {
            const user = removeUser(socket.id);
            if (user) {
                io.to(user.room).emit('connected', `${user.user} has left!`);
                io.to(user.room).emit('list users', getUsersRoom(user.room));
            }
        };
    },
};
