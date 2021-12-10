const express = require('express');
const app = express();
const path = require('path');
const io = require('./utils/socket');
const { checkUser } = require('./utils/users');

const PORT = process.env.PORT || 3000;

const root = './public';

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static(path.join(__dirname, root)));

app.get('', (req, res) => {
    if (
        !req.query.user ||
        !req.query.room ||
        req.query.user.length < 6 ||
        req.query.room.length < 6
    ) {
        return res.redirect('/join.html');
    }
    res.sendFile('chat.html', { root });
});

app.post('/api/v1/users/check-user', (req, res) => {
    if (checkUser(req.body.user)) return res.json({ status: 'success' });

    return res.json({ status: 'fail' });
});

const server = app.listen(3000, () => {
    console.log(`listening on *:${PORT}`);
    io.connect(server);
});
