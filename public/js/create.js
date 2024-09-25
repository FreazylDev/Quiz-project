const socket = io();

const startGame = document.getElementById('startGame');
const joinGame = document.getElementById('joinGame');

const card = document.getElementById('hostCard');
const hostText = document.querySelector('#hostCard h4');

startGame.addEventListener('click', () => {
    socket.emit('createGame');
});

socket.on('createGameReturn', res => {
    if (res === 'error') {
        hostText.textContent = 'Er is al een host ingelogd!';
        card.classList.add('shake');
    } else window.location = '/preGameHost';
});

joinGame.addEventListener('click', () => window.location = '/joinGame');