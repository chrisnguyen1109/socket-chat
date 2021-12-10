import { emitChatMessage } from './socket.js';

const $ = document.querySelector.bind(document);

const form = $('#form');
const inputMessage = $('input[name="msg"]');

form.addEventListener('submit', e => {
    e.preventDefault();
    if (inputMessage.value) {
        emitChatMessage(inputMessage);
    }
});
