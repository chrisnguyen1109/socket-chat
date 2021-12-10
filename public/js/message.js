import html from './renderHtml.js';

const $ = document.querySelector.bind(document);

const messageChat = $('#message-chat');
const chatHistory = $('.chat-history');

const checkAutoScroll = () => {
    const newMessage = messageChat.lastElementChild;

    const newMessageStyles = getComputedStyle(newMessage);
    const newMessageMarginBottom = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = newMessage.offsetHeight + newMessageMarginBottom;

    const visibleHeight = chatHistory.offsetHeight;

    const containerHeight = messageChat.scrollHeight;

    const scrollOffset = chatHistory.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight <= scrollOffset) return true;

    return false;
};

export default class Message {
    constructor(msg, user, response) {
        this.msg = msg;
        this.response = response;
        this.user = user;
        this.sender = undefined;
        this.html = '';
    }

    render() {
        if (this.sender === undefined) {
            this.html = html`
                <li class="clearfix mt--20">
                    <p class="notify-connect">${this.msg}</p>
                </li>
            `;
        } else {
            this.html = html`
                <li class="clearfix">
                    <div class="message-data ${this.sender && 'text-right'}">
                        ${!this.sender && '<img src="./img/default.jpg" alt="avatar" />'}
                        <span class="message-data-time">${this.sender ? 'You' : this.user}</span>
                    </div>
                    <div
                        data-toggle="tooltip"
                        data-placement="${this.sender ? 'right' : 'left'}"
                        title="${moment().format('MMMM D, h:mm A')}"
                        class="message my-message ${this.sender && 'float-right'}"
                    >
                        ${this.msg}
                    </div>
                    ${this.response && `<p class="notify-msg">${this.response}</p>`}
                </li>
            `;
        }

        return this;
    }

    send() {
        this.sender = true;
        return this;
    }

    receive() {
        this.sender = false;
        return this;
    }

    append() {
        const parser = new DOMParser();
        const { body } = parser.parseFromString(this.html, 'text/html');
        messageChat.append(body.firstChild);
        if (this.sender || checkAutoScroll()) {
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }
}
