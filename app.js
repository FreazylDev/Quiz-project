const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { handleSocket } = require('./socket.io.js');

require('dotenv').config();

const PORT = 3000;


app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/preGameHost', (req, res) => {
    res.render('preGameHost');
});

app.get('/joinGame', (req, res) => {
    res.render('joinGame');
});


io.on('connection', socket => handleSocket(socket, process.env.IP_ADDRESS));


server.listen(PORT, () => console.log('Server listening on port:', PORT));