const $ = document.querySelector.bind(document);

const chatHeader = $('.chat-header .row .col-lg-6');
const listUsers = $('.list-unstyled');
const { user } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const html = ([first, ...strings], ...values) => {
    return values
        .reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
        .filter(x => (x && x !== true) || x === 0)
        .join('');
};

const renderChatHeader = (currentUsers, room) => {
    const content = html`
        <a href="javascript:void(0);">
            <img src="./img/default.jpg" alt="avatar" />
        </a>
        <div class="chat-about">
            <h6 class="m-b-0 room-title">${room}</h6>
            <small>Current users: <b>${currentUsers} people</b> </small>
        </div>
    `;

    chatHeader.innerHTML = content;
};

const renderListUser = users => {
    let content = '';
    users.forEach(el => {
        content += html`
            <li class="clearfix ${el === user && 'active'}">
                <img src="./img/default.jpg" alt="avatar" />
                <div class="about">
                    <div class="name">${el}</div>
                    <div class="status"><i class="fa fa-circle online"></i> online</div>
                </div>
            </li>
        `;
    });

    listUsers.innerHTML = content;
};

export { renderChatHeader, renderListUser };

export default html;
