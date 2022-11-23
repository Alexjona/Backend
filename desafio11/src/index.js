
const express = require('express');
const { urlencoded } = require('express');
const { Server } = require('socket.io');
const path = require('path');
const router = require('./routes');
const Sockets = require('./sockets');
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 8080);
app.use('/api', router);

const server = app.listen(app.get('port'), () => {
    console.info(
        '\x1b[33m%s\x1b[0m', `>>> Server listening on port ${app.get(
            'port'
        )} 🚀 : http://localhost:8080/`
    );
});

const io = new Server(server);

Sockets(io);