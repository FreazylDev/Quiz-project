const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { handleSocket } = require('./socket.io.js');

const PORT = 3000;


app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});


io.on('connection', handleSocket);


server.listen(PORT, () => console.log('Server listening on port:', PORT));