const handleSocket = socket => {
    console.log('a user has connected');
    socket.on('disconnect', () => console.log('a user has disconnected'));
};


module.exports = { handleSocket }