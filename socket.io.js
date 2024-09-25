const { ip } = require('./app.js')

const users = new Map();

let ID = '';

const generateID = () => {
    if (ID !== '') return ID;
    else {
        for (let i = 0; i < 10; i++) {
            const randomNumber = Math.floor(Math.random() * 10);
            ID += randomNumber;
        } return ID;
    }
}

let hostJoined = false;

const handleSocket = (socket, ip) => {
    console.log('a user has connected');

    socket.on('createGame', () => {
        socket.emit('createGameReturn', (hostJoined) ? 'error' : ID === '' ? generateID() : ID);
        if (!hostJoined) {
            users.set('HOST', socket.id);
            console.log(users);
        };
        hostJoined = true;
    });
    socket.on('reqID', () => {
        hostJoined = true;
        users.set('HOST', socket.id);
        const id = ID === '' ? generateID() : ID;
        socket.emit({ id, ip });
    });

    socket.on('joinGame', name => {
        if (users.has(name)) {
            socket.emit('joinGameReturn', 'User already exists');
        } else {
            socket.emit('joinGameReturn', `${name} added`);
            users.set(name, socket.id);
            console.log(users);
        }
    });

    socket.on('disconnect', () => {
        for (let [name, id] of users) {
            if (id === socket.id) {
                console.log(name, 'has disconnected');
                socket.emit('disconnection', name);
                users.delete(name);
                console.log(users);
                if (name === 'HOST') hostJoined = false;
                break;
            }
        }
    });
};


module.exports = { handleSocket }