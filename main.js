import Game from './game.js';

const game = new Game();

game.init();

document.querySelector('.logo').addEventListener('click', () => location.reload());
