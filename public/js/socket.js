import Message from './message.js';
import { renderChatHeader, renderListUser } from './renderHtml.js';

const socket = io();
const { user, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.on('connected', msg => {
    new Message(msg).render().append();
});

socket.on('chat message', response => {
    new Message(response.msg, response.user).receive().render().append();
});

socket.on('list users', users => {
    renderChatHeader(users.length, room);
    renderListUser(users);
});

socket.emit('join', { user, room }, err => {
    if (err) location.href = '/join.html';
});

export const emitChatMessage = inputMessage => {
    return socket.emit('chat message', inputMessage.value, response => {
        new Message(response.msg, response.user, response.res).send().render().append();
        inputMessage.value = '';
    });
};
